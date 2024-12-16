import styles from "./styles.module.css";

interface ITitleBase {
  title: string;
  className: string;
}

function TitleBase({ title, className }: ITitleBase) {
  return <div className={className}>{title}</div>;
}

interface ITitle {
  title: string;
}

interface IContent {
  content: string;
}

export function Title({ title }: ITitle) {
  return <TitleBase title={title} className={styles.title} />;
}

export function SubTitle({ title }: ITitle) {
  return <TitleBase title={title} className={styles.sub_title} />;
}

export function Content({ content }: IContent) {
  return <TitleBase title={content} className={styles.content} />;
}
