import Avatar from "@/src/components/Avatar/Avatar";
import imgAvatar from "@/src/assets/avatar.webp";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import axios from "axios";
import { Conversation } from "@/src/types/conversation";
import Link from "next/link";

interface HomeProps {
  conversations: Conversation[];
}

// Vue Client
export default function Home({ conversations }: HomeProps) {
  return (
    <main>
      <ul className="md:w-5/12 my-0 mx-auto p-2">
        {conversations.map((conversation) => {
          const date = new Date(conversation.lastMessageTimestamp * 1000);
          const dateFormat = date.toLocaleDateString("fr-FR", {
            month: "long",
            year: "numeric",
          });
          return (
            <Link
              key={conversation.id}
              href={`/conversation/${conversation.id}/${conversation.recipientId}`}
            >
              <li className="my-4 p-2 flex items-center gap-20 border-2 border-gray-300 rounded-lg hover:border-orange-400">
                <Avatar img={imgAvatar} text="AJ" />
                <div className="flex flex-col gap-y-2">
                  <h2 className="text-3xl font-bold">
                    {conversation.recipientNickname}
                  </h2>
                  <p className="text-gray-400">{dateFormat}</p>
                </div>
              </li>
            </Link>
          );
        })}
      </ul>
    </main>
  );
}

// Appel client => _app.tsx => documents.tsx => getServerSideProps => default function Home

// Server
export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  let data = await axios
    .get("http://localhost:3005/conversations/1")
    .then((response) => {
      return response.data as Conversation[];
    });

  return {
    props: {
      conversations: data,
    },
  };
};
