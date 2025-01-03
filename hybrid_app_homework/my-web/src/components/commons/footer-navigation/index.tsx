"use client";

import Footer from "@/commons/layout/footer";
import Link from "next/link";
import { FiMapPin } from "react-icons/fi";
import { FaUserAlt } from "react-icons/fa";
import { IoIosAdd } from "react-icons/io";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function FooterNavigation() {
  const pathname = usePathname();

  return (
    <Footer className="border-t border-[#f2f2f2] p-[0.75rem_0_1.5rem]">
      <Link
        href="/solplace-logs/new"
        className="fixed right-5 bottom-[6.25rem] w-12 h-12 bg-[var(--primary)] rounded-full flex items-center justify-center"
      >
        <IoIosAdd size={40} color="#fff" />
        <div className="blind">새글작성</div>
      </Link>
      <ul className="flex justify-around text-[0.6875rem] items-center">
        <li className={clsx(pathname === "/mypage" && "opacity-50")}>
          <Link
            className="flex flex-col items-center gap-1"
            href="/solplace-logs"
          >
            <FiMapPin size={20} color="#000" />
            플레이스
          </Link>
        </li>
        <li className={clsx(pathname !== "/mypage" && "opacity-50")}>
          <Link className="flex flex-col items-center gap-1" href="/mypage">
            <FaUserAlt size={15} color="#000" />내 설정
          </Link>
        </li>
      </ul>
    </Footer>
  );
}
