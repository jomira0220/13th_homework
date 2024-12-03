import React from "react";

export default function Footer({
  children,
  isFixed,
}: {
  children: React.ReactNode;
  isFixed?: boolean;
}) {
  return (
    <>
      <div style={{ flex: 1 }}></div>
      <footer className={`w-full p-4 ${isFixed ? "fixed" : ""}`}>
        {children}
      </footer>
    </>
  );
}
