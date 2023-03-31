import datas from "@/src/server/db.json";
import { Message } from "@/src/types/message";
import { User } from "@/src/types/user";
import { FC } from "react";
console.log(datas);

// Messages ayant le conversationID de l'URL
// Information User Ayant le Nickname dans l'URL

interface ConversationProps {
  messages: Message[];
  correspondent: User;
}

const Conversation: FC<ConversationProps> = ({ messages, correspondent }) => {
  const date = new Date(messages[messages.length - 1].timestamp * 1000);
  const dateFormat = date.toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
  return (
    <main className="md:w-5/12 my-0 mx-auto">
      <div className="px-4 flex justify-between">
        <p className="font-bold">{correspondent.nickname} - Vous</p>
        <p className="font-bold">Dernier message : {dateFormat}</p>
      </div>

      <ul>
        {messages.map((message) => {
          return (
            <li
              key={message.id}
              className={message.authorId === 1 ? "text-right" : ""}
            >
              <p className="text-slate-400">
                {message.authorId !== 1 ? message.authorId : ""}
              </p>
              <p
                className={`p-3 rounded-lg ${
                  message.authorId === 1
                    ? "bg-cyan-600 text-white"
                    : "bg-slate-300"
                }`}
              >
                {message.body}
              </p>
            </li>
          );
        })}
      </ul>

      <form>
        <input
          type="text"
          placeholder="Send message"
          className="p-2 rounded-lg border-slate-300"
        />
      </form>
    </main>
  );
};

export default Conversation;
