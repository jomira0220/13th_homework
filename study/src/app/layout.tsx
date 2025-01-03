import type { Metadata } from "next";
import "./globals.css";
import { Noto_Sans_KR, Roboto } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
// import ApolloSetting from "../commons/settings/apollo-setting";
// import ApolloUploadSetting from "../commons/settings/apollo-setting";
import ApolloHeaderSetting from "@/commons/settings/apollo-setting";

// import Script from "next/script";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

/* eslint-disable */
const notoSansKr = Noto_Sans_KR({
  preload: false,
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--noto-sans-kr",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--roboto",
});

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <body className={`antialiased`}>
        <div>{modal}</div>
        <div>~~~~~레이아웃~~~~~~</div>
        <ApolloHeaderSetting>
          <AntdRegistry>{children}</AntdRegistry>
          {/* <Script
            src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&libraries=services,clusterer&autoload=false`}
            strategy="beforeInteractive"
          /> */}
        </ApolloHeaderSetting>
        <div>~~~~~레이아웃~~~~~~</div>
      </body>
    </html>
  );
}
