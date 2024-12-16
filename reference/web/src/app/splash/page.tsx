import Image from "next/image";
import styles from "./styles.module.css";

export default function Splash() {
  return (
    <main style={{ width: "calc(100% + 1.25rem)" }}>
      <div>
        <Image
          src="/images/splash.png"
          alt="splash"
          layout="fill"
          objectFit="cover"
        />
      </div>
    </main>
  );
}
