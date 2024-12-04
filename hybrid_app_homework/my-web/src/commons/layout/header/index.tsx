"use client";

import { HeaderType } from "@/commons/layout/header/contants";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import styles from "./styles.module.css";

export interface IHeaderBaseProps {
  hasBack: boolean;
  title: string;
  isTransparent?: boolean;
  children?: React.ReactNode;
}

const HeaderBase = ({
  hasBack,
  title,
  isTransparent,
  children,
}: IHeaderBaseProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = Object.fromEntries(searchParams.entries());
  const currentParams = new URLSearchParams(searchParams.toString());
  console.log("currentParams", currentParams.size);
  // const pathname = usePathname();
  // // 파라미터를 제외한 페이지 이동 경로를 세션스토리지에 저장하는 함수
  // const savePageMoveHistory = () => {
  //   const getHistorySessionHistory = sessionStorage.getItem("pageMoveHistory"); // 세션스토리지에 저장된 페이지 이동 경로
  //   if (!getHistorySessionHistory) {
  //     sessionStorage.setItem("pageMoveHistory", JSON.stringify([pathname]));
  //   } else {
  //     const historyArr = JSON.parse(getHistorySessionHistory);
  //     if (!historyArr.includes(pathname)) {
  //       // 현재 페이지 경로가 세션스토리지에 저장된 경로에 없을 경우
  //       sessionStorage.setItem(
  //         "pageMoveHistory",
  //         JSON.stringify([...historyArr, pathname])
  //       );
  //     }
  //   }
  // };

  // useEffect(() => {
  //   // 페이지 이동시 세션스토리지에 경로 저장
  //   savePageMoveHistory();
  // }, [pathname]);

  // const handleBackWithoutQuery = () => {
  //   const prevPath = sessionStorage.getItem("pageMoveHistory") ?? false;
  //   if (prevPath) {
  //     const historyArr = JSON.parse(prevPath);
  //     historyArr.pop(); // 현재 페이지 경로 제거
  //     sessionStorage.setItem("pageMoveHistory", JSON.stringify(historyArr)); // 현재 페이지를 제외한 경로 배열 세션스토리지에 저장
  //     console.log("historyArr", historyArr);
  //     router.push(historyArr.pop()); // 현재 페이지를 제외한 마지막 페이지인 이전 페이지로 이동
  //   } else {
  //     router.push("/");
  //   }
  // };

  return (
    <>
      <header
        className={
          styles.header + (isTransparent ? " " + styles.fixedHeader : "")
        }
      >
        {hasBack && (
          <button type="button" onClick={() => router.back()}>
            <IoIosArrowBack size={24} />
          </button>
        )}
        {title && <h3 className="font-bold text-lg">{title}</h3>}
        {children ? children : <></>}
      </header>
      {/* {isTransparent ? <div style={{ height: "50px" }}></div> : <></>} */}
    </>
  );
};

export default function HeaderGlobal() {
  const pathname = usePathname();
  const params = useParams();
  const options = HeaderType(params).GLOBAL[pathname];

  return (
    <div style={{ display: options ? "block" : "none" }}>
      <HeaderBase {...options} />
    </div>
  );
}

export function Header({ children, ...rest }: { children?: React.ReactNode }) {
  const pathname = usePathname();
  const params = useParams();
  const options = HeaderType(params).LOCAL[pathname];

  console.log("options", options);
  return (
    // <div style={{ display: options ? "block" : "none" }}>
    <HeaderBase {...options} {...rest}>
      {children}
    </HeaderBase>
    // </div>
  );
}
