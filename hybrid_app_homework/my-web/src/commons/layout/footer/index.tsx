import React from "react";
import { usePathname, useParams } from "next/navigation";

export default function Footer({
  children,
  isFixed,
}: {
  children: React.ReactNode;
  isFixed?: boolean;
}) {
  const pathname = usePathname();
  const params = useParams();

  return (
    <>
      <div style={{ flex: 1 }}></div>
      <footer className={`w-full p-4 ${isFixed ? "fixed" : ""}`}>
        {children}
      </footer>
    </>
  );
}
