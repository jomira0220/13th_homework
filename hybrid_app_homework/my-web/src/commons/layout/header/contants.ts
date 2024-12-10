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
    "/solplace-logs/new": { hasBack: true, title: "플레이스 등록", isTransparent: false, isNotchTransparent: false },
    "/solplace-logs": { hasBack: false, title: "플레이스", isTransparent: false, isNotchTransparent: false },
  },
  LOCAL:{
    [`/solplace-logs/${params.Id}`]: { hasBack: true, title: "", isTransparent: true, isNotchTransparent: true },
    [`/solplace-logs/${params.Id}/edit`]: { hasBack: true, title: showmap ? "" : "플레이스 수정", isTransparent: showmap ? true : false, isNotchTransparent: showmap ? true : false },
  }
}
};
