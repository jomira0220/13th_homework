import SignUpForm from "@/components/domain/signup/signup-form";

export default function SignUpPage() {
  return (
    <>
      <div className="flex items-center gap-10 flex-col w-screen px-4 pt-6">
        <div className="text-center flex flex-col gap-3">
          <h1 className="font-bold text-lg">회원가입</h1>
          <p className="text-[#777] font-medium text-sm">
            회원가입을 위해 필요한 정보를 모두 입력해 주세요.
          </p>
        </div>

        <SignUpForm />
      </div>
    </>
  );
}
