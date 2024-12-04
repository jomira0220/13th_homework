"use client";
import React from "react";
import clsx from "clsx";

export default function Footer({
  children,
  isFixed,
  className,
}: {
  children?: React.ReactNode;
  isFixed?: boolean;
  className?: string;
}) {
  return (
    <>
      <div style={{ flex: 1 }}></div>
      <footer
        // className={`w-full p-4 ${isFixed ? "fixed" : ""}`}
        className={clsx(
          "w-full p-4",
          isFixed && "fixed",
          className && className
        )}
      >
        {children}
      </footer>
    </>
  );
}
