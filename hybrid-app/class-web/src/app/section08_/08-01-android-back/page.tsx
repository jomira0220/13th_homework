import Link from "next/link";

export default function AndroidBackPage() {
  return (
    <>
      <div>여기는 메인페이지입니다.</div>
      <br />
      <Link
        className="bg-blue-700 text-white rounded-md p-2"
        href="/section08/08-01-android-back-moved"
      >
        페이지 이동
      </Link>
    </>
  );
}
