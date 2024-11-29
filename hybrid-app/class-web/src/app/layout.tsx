import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
// import Layout from "@/commons/layout/02-02-layout-header-global";
// import LayoutGlobalAndLocal from "@/commons/layout/02-03-layout-header-local";
// import LayoutHeaderTransparent from "@/commons/layout/02-04-layout-header-transparent";
// import LayoutFooterContentsShortAndLong from "@/commons/layout/02-05-layout-footer-contents-short-and-long";
import DeviceSetting from "@/commons/settings/03-06-device-setting";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* 1). 02-02-layout-header-global 이후 레이아웃 */}
        {/* <Layout>{children}</Layout> */}

        {/* 2). 02-03-layout-header-local 이후 레이아웃 */}
        {/* <LayoutGlobalAndLocal>{children}</LayoutGlobalAndLocal> */}

        {/* 3). 02-04-layout-header-transparent 이후 레이아웃 */}
        {/* <LayoutHeaderTransparent>{children}</LayoutHeaderTransparent> */}

        {/* 4). 02-05-layout-footer-contents-short-and-long 이후 레이아웃 */}
        {/* <LayoutFooterContentsShortAndLong>{children}</LayoutFooterContentsShortAndLong> */}

        {/* 5). 03-01-webview-log 이후 => 레이아웃에 의존하지 않고 수업*/}
        {/* {children} */}

        {/* 6). 03-06-post-message-device-api-promise-refactoring */}
        <DeviceSetting>{children}</DeviceSetting>
      </body>
    </html>
  );
}
