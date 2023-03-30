import { StaticImageData } from "next/image";
import Image from "next/image";

interface AvatarProps {
  img?: StaticImageData;
  text: string;
}

export default function Avatar({ img, text }: AvatarProps) {
  return (
    <>
      {img !== undefined ? (
        <Image src={img} alt={text} className="w-20 ml-10" />
      ) : (
        <p>{text}</p>
      )}
    </>
  );
}
