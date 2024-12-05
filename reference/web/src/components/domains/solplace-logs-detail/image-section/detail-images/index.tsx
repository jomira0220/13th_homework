import Image from "next/image";
import styles from "./styles.module.css";

interface ISolplaceLogsDetailImages {
  image: string;
  imageIndex: number;
  totalImage: number;
}

export default function SolplaceLogsDetailImages(props: ISolplaceLogsDetailImages) {
  return (
    <div className={styles.image_wrapper}>
      <Image
        className={styles.image}
        src={props.image}
        alt={`${props.imageIndex}번째 이미지`}
        width={0}
        height={0}
        sizes="100vw"
      />
    </div>
  );
}
