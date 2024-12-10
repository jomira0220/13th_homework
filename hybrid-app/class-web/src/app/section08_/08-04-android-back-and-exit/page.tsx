import Link from "next/link";

export default function AndroidBackAndExitPage() {
  return (
    <>
      <div>여기는 메인페이지입니다.</div>
      {/* 현재 페이지에서 안드로이드 뒤로가기시 앱 종료가 실행됨 */}
      <br />
      <Link
        className="bg-blue-700 text-white rounded-md p-2"
        href="/section08/08-04-android-back-and-exit-moved"
      >
        페이지 이동
      </Link>
    </>
  );
}
