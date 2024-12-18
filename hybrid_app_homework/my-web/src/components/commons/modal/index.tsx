"use client";

import { IoIosClose } from "react-icons/io";
import clsx from "clsx";

interface IModalProps {
  children: React.ReactNode;
  modalHandler: {
    modalOpen: boolean;
    setModalOpen: (open: boolean) => void;
  };
  isClose?: "rightTop" | "bottom";
}

export default function Modal({
  children,
  modalHandler,
  isClose,
}: IModalProps) {
  const { modalOpen, setModalOpen } = modalHandler;

  return (
    <>
      {modalOpen && (
        <>
          <div
            onClick={() => setModalOpen(false)}
            className="fixed w-screen h-screen top-0 left-0 bg-black bg-opacity-50 z-50"
          ></div>
          <div
            className={clsx(
              "min-w-80 bg-white rounded-xl fixed z-50 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2",
              { "p-3": isClose === "rightTop" }
            )}
          >
            {isClose && isClose === "rightTop" && (
              <button
                onClick={() => setModalOpen(false)}
                className="absolute right-2 top-2"
              >
                <IoIosClose size="40" />
              </button>
            )}
            {children}

            {isClose && isClose === "bottom" && (
              <div className="w-full p-5">
                <button
                  className="w-full bg-[--primary] rounded-xl text-white p-2 font-bold h-10"
                  onClick={() => setModalOpen(false)}
                >
                  닫기
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}
