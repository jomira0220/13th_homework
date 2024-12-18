import type { Params } from "next/dist/shared/lib/router/utils/route-matcher";

type IHeaderType = {
  [K in "GLOBAL" | "LOCAL"]: {
    [key: string]: {
      title: string;
      hasBack: boolean;
      isTransparent: boolean;
      isNotchTransparent?: boolean;
      hasLogo?: boolean;
      backUrl?: string;
    };
  };
};

// prettier-ignore
export const HeaderType = (params: Params, queryParams?: { showmap?: string }): IHeaderType =>{
  const showmap =  queryParams?.showmap === "true";

  return {
  GLOBAL: {
    "/mypage": { hasBack:false, title:"내 설정", isTransparent:false, isNotchTransparent:false },
    "/solplace-logs/new": { hasBack: true, title: "플레이스 등록", isTransparent: false, isNotchTransparent: false },
    "/solplace-logs": { hasBack: false, title: "플레이스", isTransparent: false, isNotchTransparent: false },
    "/signup": { hasBack: true, title: "회원가입", isTransparent: false, isNotchTransparent: false, backUrl: "/login" },
  },
  LOCAL:{
    "/login": { hasBack: false, title: "", isTransparent: false, isNotchTransparent: false },
    [`/solplace-logs/${params.Id}`]: { hasBack: true, title: "", isTransparent: true, isNotchTransparent: true },
    [`/solplace-logs/${params.Id}/edit`]: { 
      hasBack: true, title: showmap ? "" : "플레이스 수정", 
      isTransparent: showmap ? true : false, 
      isNotchTransparent: showmap ? true : false,
      backUrl: `/solplace-logs/${params.solplaceLogId}`,
     },
  }
}
};
