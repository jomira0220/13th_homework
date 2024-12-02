import type { Params } from "next/dist/shared/lib/router/utils/route-matcher";

type IHeaderType = {
  [K in "GLOBAL" | "LOCAL"]: {
    [key: string]: {
      title: string;
      hasBack: boolean;
      isTransparent: boolean;
      hasLogo?: boolean;
      backUrl?: string;
    };
  };
};

// prettier-ignore
export const HeaderType = (params:Params ):IHeaderType  => ({
  GLOBAL: {
    "/solplace-logs/new": { hasBack: true, title: "플레이스 등록", isTransparent: false },
    "/solplace-logs": { hasBack: false, title: "플레이스", isTransparent: false },
  },
  LOCAL:{
    [`/solplace-logs/${params.Id}`]: { hasBack: true, title: "", isTransparent: true },
    [`/solplace-logs/${params.Id}/edit`]: { hasBack: true, title: "플레이스 수정", isTransparent: false },
  }
});
