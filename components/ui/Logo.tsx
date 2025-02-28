import Image from "next/image";

export default function Logo() {
  return (
    <h1 className="text-3xl font-extrabold text-white">
      POS {""}
      <span className="text-green-400 text-xl ">Next.js / Nest</span>
    </h1>
  );
}

export function LogoAuth() {
  return (
    <Image
      src="/POS.svg"
      alt="Logo CashTrackr"
      width={0}
      height={0}
      className="w-full"
      priority
    />
  );
}
