import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
// import Layout from "@/commons/layout/02-02-layout-header-global";
// import LayoutGlobalAndLocal from "@/commons/layout/02-03-layout-header-local";
// import LayoutHeaderTransparent from "@/commons/layout/02-04-layout-header-transparent";
// import LayoutFooterContentsShortAndLong from "@/commons/layout/02-05-layout-footer-contents-short-and-long";
// import DeviceSetting from "@/commons/settings/03-06-device-setting";
// import DeviceSettingVariables from "@/commons/settings/05-01-device-setting-variables";
// import DeviceSettingRedirect from "@/commons/settings/05-02-device-setting-redirect";
// import DeviceSettingBack from "@/commons/settings/08-01-device-setting-back";
// import DeviceSettingBackAndExit from "@/commons/settings/08-04-device-setting-back-and-exit";
// import DeviceSettingViewTransition from "@/commons/settings/09-01-device-setting-view-transition";
// import RoutingSettingViewTransition from "@/commons/settings/09-01-routing-setting-view-transition";
import ApolloSettingMicroFrontendSharedCache from "@/commons/settings/12-02-apollo-setting-micro-frontend-shared-cache";
import DeviceSettingMicroFrontendSharedCache from "@/commons/settings/12-02-device-setting-micro-frontend-shared-cache";

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

// Viewport 설정 => 07-02-picture-full-screen-pinch-zoom 에서 사용 : 모바일 웹뷰 기능으로 부족한 부분에 대해서 보완하기 위한 설정
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
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
        {/* <DeviceSetting>{children}</DeviceSetting> */}

        {/* 7). 05-01-schedule-notifications */}
        {/* <DeviceSettingVariables>{children}</DeviceSettingVariables> */}

        {/* 8). 05-02-schedule-notifications-click */}
        {/* <DeviceSettingRedirect>{children}</DeviceSettingRedirect> */}

        {/* 9). 08-01-android-back */}
        {/* <DeviceSettingBack>{children}</DeviceSettingBack> */}

        {/* 10). 08-04-android-back-and-exit */}
        {/* <DeviceSettingBackAndExit>{children}</DeviceSettingBackAndExit> */}

        {/* 11). 09-01-view-transition */}
        {/* <DeviceSettingViewTransition>
          <RoutingSettingViewTransition>
            {children}
          </RoutingSettingViewTransition>
        </DeviceSettingViewTransition> */}

        {/* 12). 12-02-micro-frontend-shared-cache */}
        <ApolloSettingMicroFrontendSharedCache>
          <DeviceSettingMicroFrontendSharedCache>
            {children}
          </DeviceSettingMicroFrontendSharedCache>
        </ApolloSettingMicroFrontendSharedCache>
      </body>
    </html>
  );
}
