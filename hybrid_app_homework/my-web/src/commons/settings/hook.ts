import { requestedApis } from ".";

declare const window: Window & {
  ReactNativeWebView: {
    postMessage: (message: string) => void;
  };
};

export const useDataSetting = () => {
  const fetchApp = async ({ query }) => {
    const result = await new Promise((resolve) => {
      requestedApis[query] = resolve;
      window.ReactNativeWebView.postMessage(JSON.stringify({ query }));
    });

    return result;
  };

  return { fetchApp };
};
