import axios from "axios";
import { useState } from "react";
import { Message } from "../types/message";
import { User } from "../types/user";
import Image from "next/image";
import bin from "@/public/bin.png";

interface MessageItemProps {
  message: Message;
  correspondent: User;
  me: User;
}

function MessageItem({ message, correspondent, me }: MessageItemProps) {
  const [hasClickedOnBin, setHasClickedOnBin] = useState(false);

  // delete message
  const handleDeleteClick = () => {
    setHasClickedOnBin(true);
  };

  const handleNoClick = () => {
    setHasClickedOnBin(false);
  };

  const handleYesClick = () => {
    console.log(message);
    axios
      .delete(`http://localhost:3005/message/${message.id}`)
      .then(() => {
        console.log("msg supprimé");
      })
      .catch((error) => {
        console.log(error);
        console.log("erreur");
      })
      .finally(() => {
        setHasClickedOnBin(false);
      });
  };

  return (
    <li
      className={`my-5 flex flex-col gap-y-1.5 ${
        message.authorId === 1 ? "items-end text-right" : "items-start"
      }`}
    >
      <p className="text-slate-400">
        {message.authorId !== 1
          ? correspondent.nickname
          : `Vous : ${me.nickname}`}
      </p>
      <p
        className={`p-3 rounded-lg ${
          message.authorId === 1 ? "bg-cyan-400 text-white" : "bg-slate-300"
        }`}
      >
        {message.body}
      </p>
      {message.authorId === 1 &&
        (hasClickedOnBin === false ? (
          <Image
            src={bin}
            alt="bin-icon"
            className="w-4 cursor-pointer"
            onClick={handleDeleteClick}
          />
        ) : (
          <p className="text-red-400">
            Supprimer ce message ?{" "}
            <span
              className="cursor-pointer hover:text-red-800"
              onClick={handleYesClick}
            >
              Oui
            </span>{" "}
            /{" "}
            <span
              className="cursor-pointer hover:text-red-800"
              onClick={handleNoClick}
            >
              Non
            </span>
          </p>
        ))}
    </li>
  );
}

export default MessageItem;
