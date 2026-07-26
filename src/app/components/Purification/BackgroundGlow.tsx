import Image from "next/image";

export default function BackgroundGlow() {
  return (
    <div className="relative w-full h-[380px] xl:h-[550px]">
      <Image
        src="/images/bgsg.png"
        alt=""
        fill
        priority
        className="object-cover object-top"
      />
    </div>
  );
}