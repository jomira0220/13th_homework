import Image from "next/image";

export default function Splash() {
  return (
    <main style={{ width: "calc(100% + 1.25rem)" }}>
      <Image
        src="/images/splash.png"
        alt="splash"
        layout="fill"
        objectFit="cover"
      />
    </main>
  );
}
