import Form from "@/components/commons/form";
import { Input } from "@/components/commons/input";
import { loginSchema } from "@/commons/schema/login";
import type { ILoginSchema } from "@/commons/schema/login";
import { SubmitButton } from "@/components/commons/button";
import { useLogin } from "./hook";
import Link from "next/link";
import { Header } from "@/commons/layout/header";
import Image from "next/image";

export default function LoginPage() {
  return (
    <>
      <Header>
        <Link href="/">
          <Image src="./icons/logo.svg" alt="트립트립" width="52" height="32" />
        </Link>
      </Header>
      <div className="flex items-center gap-[4.5rem] flex-col h-screen w-screen px-4 pt-6">
        <h1 className="font-bold text-lg">로그인</h1>
        <Form<ILoginSchema>
          schema={loginSchema}
          methodsSet={useLogin}
          className="w-full flex flex-col gap-6"
        >
          <div className="flex flex-col gap-3">
            <Input<ILoginSchema>
              type="text"
              name="email"
              title="이메일"
              placeholder="이메일을 입력해주세요."
              required
              isError
            />
            <Input<ILoginSchema>
              type="password"
              name="password"
              title="비밀번호"
              placeholder="비밀번호를 입력해주세요."
              required
              isError
            />
          </div>

          <div className="flex flex-col gap-3 items-center">
            <SubmitButton className="button-primary disabled:button-primary-off">
              로그인
            </SubmitButton>
            <Link
              href="/signup"
              className="font-semibold text-[0.8125rem] leading-5"
            >
              회원가입
            </Link>
          </div>
        </Form>
      </div>
    </>
  );
}
