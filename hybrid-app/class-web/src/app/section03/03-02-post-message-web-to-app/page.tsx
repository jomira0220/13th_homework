"use client";

declare const window: Window & {
  ReactNativeWebView: {
    postMessage: (message: string) => void;
  };
};

export default function PostMessageWebToAppPage() {
  const onClickButton = () => {
    window.ReactNativeWebView.postMessage("안녕하세요! 사과!");
  };
  return (
    <button
      onClick={onClickButton}
      className="bg-black text-white rounded-lg p-3"
    >
      App아! 데이터 보내줄께!
    </button>
  );
}
