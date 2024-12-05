"use client";

import { ICONS } from "@/commons/constants/images";
import Image from "next/image";
import styles from "./styles.module.css";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Title } from "@/components/commons/title";
import { headerType } from "./constants";
import clsx from "clsx";

interface IHeaderBase {
  hasLogo?: boolean;
  hasBack?: boolean;
  isTransParent?: boolean;
  title?: string;
  children?: React.ReactNode;
  backUrl?: string;
}

function HeaderBase({ hasLogo, hasBack, isTransParent, title, children, backUrl }: IHeaderBase) {
  const router = useRouter();

  const onClickBack = () => {
    if (backUrl) {
      router.push(backUrl);
    } else {
      history.back();
    }
  };
  return (
    <>
      <div className={clsx(styles.header, { [styles.transparent]: isTransParent })}>
        {hasLogo && <Image className={styles.logo} src={ICONS.logo.src} alt={ICONS.logo.alt} width={0} height={0} />}
        {hasBack && (
          <div onClick={onClickBack}>
            <Image
              className={styles.back_button}
              src={ICONS.leftArrow.src}
              alt={ICONS.leftArrow.alt}
              width={0}
              height={0}
            />
          </div>
        )}
        {title ? <Title title={title ?? ""} /> : <>{children}</>}
      </div>
      {isTransParent || <div className={styles.sub_header}></div>}
    </>
  );
}

export function GlobalHeader() {
  const pathname = usePathname();
  const params = useParams();

  const props = headerType(params).globalHeader[pathname];

  const isDisplay = props === undefined ? { display: "none" } : { display: "block" };

  return (
    <div style={isDisplay}>
      <HeaderBase {...props} />
    </div>
  );
}

export function Header({ children }: { children: React.ReactNode }) {
  return <HeaderBase>{children}</HeaderBase>;
}
