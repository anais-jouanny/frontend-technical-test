import { User } from "@/src/types/user";
import axios from "axios";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { FC, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import MessageItem from "@/src/components/Message";
import { Message } from "@/src/types/message";

// A récupérer :
// Messages ayant le conversationID de l'URL
// Information User ayant le Nickname de l'URL

// A Checker :
// {" "} dans les <p>
// les images apparaissent une fois sur deux
// longueur du composant

interface ConversationProps {
  messages: Message[];
  correspondent: User;
  me: User;
  convId: number;
}

interface InputProps {
  message: string;
}

const Conversation: FC<ConversationProps> = ({
  messages,
  correspondent,
  me,
  convId,
}) => {
  // state
  const [allMessages, setAllMessages] = useState(messages);

  // date
  let dateFormat = "";

  if (allMessages.length > 0) {
    const date = new Date(allMessages[allMessages.length - 1].timestamp * 1000);
    dateFormat = date.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
  }

  // message form
  const { register, handleSubmit } = useForm<InputProps>();

  const submit = (data: any, e: any) => {
    const newMessage = data.message;

    // post message to DB
    axios
      .post(`http://localhost:3005/messages/${convId}`, {
        body: newMessage,
        timestamp: Date.now(),
      })
      .then((response) => {
        setAllMessages([
          ...allMessages,
          {
            id: response.data.id,
            conversationId: convId,
            authorId: me.id,
            timestamp: response.data.timestamp,
            body: response.data.body,
          },
        ]);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        e.target.reset();
      });
  };

  return (
    <main className="p-6 my-0 mx-auto flex flex-col lg:w-3/4 xl:w-1/2 lg:border border-slate-200 rounded-lg">
      <Link
        key="retour"
        href={"/"}
        className="text-slate-500 hover:text-sky-700"
      >
        &#x3008; Retour
        <span className="hidden md:inline"> aux conversations</span>
      </Link>

      <div className="px-4 my-8 flex justify-between">
        <p className="font-bold">Conversation avec {correspondent.nickname}</p>
        <p className="hidden font-bold md:block">
          Dernier message : {dateFormat}
        </p>
      </div>

      {allMessages.length > 0 ? (
        <ul>
          {allMessages.map((message) => {
            return (
              <MessageItem
                key={message.id}
                message={message}
                correspondent={correspondent}
                me={me}
              />
            );
          })}
        </ul>
      ) : (
        <p className="m-2">
          Vous n&apos;avez pas de messages avec {correspondent.nickname} pour le
          moment
        </p>
      )}

      <form className="text-center mt-12" onSubmit={handleSubmit(submit)}>
        <input
          type="text"
          placeholder="Send message"
          className="p-2 border rounded-lg border-slate-300 w-3/4 bg-icon-send bg-no-repeat bg-right bg-contain"
          {...register("message", { required: true })}
        />
      </form>
    </main>
  );
};

export default Conversation;

// Server
export const getServerSideProps: GetServerSideProps<ConversationProps> = async (
  context
) => {
  const slug = context.params?.slug;

  // safer than if(slug)
  if (typeof slug === "object") {
    let messages = await axios
      .get(`http://localhost:3005/messages/${slug[0]}`)
      .then((response) => {
        console.log(response.data);
        return response.data;
      });

    let correspondent = await axios
      .get(`http://localhost:3005/user/${slug[1]}`)
      .then((response) => {
        return response.data;
      });

    let me = await axios
      .get("http://localhost:3005/user/1")
      .then((response) => {
        return response.data;
      });

    return {
      props: {
        messages: messages,
        correspondent: correspondent[0],
        me: me[0],
        convId: parseInt(slug[0]),
      },
    };
  }

  return {
    props: {
      messages: "messages",
      correspondent: {},
      me: {},
      convId: 0,
    },
  };
};
