"use client";

import Image from "next/image";
import Link from "next/link";
import Input from "@/components/input";
import { useLoginPage } from "./hook";
import { Button } from "antd";
import { FormProvider } from "react-hook-form";

export default function LoginPage() {
  const { signInSubmit, router, methods } = useLoginPage();

  return (
    <>
      <h1>
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="트립트립"
            width={120}
            height={74.5}
          />
        </Link>
      </h1>
      <h2 className="font-bold">트립토그에 오신것을 환영합니다.</h2>
      <div className="flex flex-col gap-4 w-full">
        <p className="text-sm text-gray-800">트립토크에 로그인 하세요.</p>
        <FormProvider {...methods}>
          <form className="flex flex-col gap-3">
            <Input
              id="email"
              type="text"
              placeholder="이메일을 입력해 주세요."
            />

            <Input
              id="password"
              type="password"
              placeholder="비밀번호를 입력해 주세요."
              onKeyUp={(e) => e.key === "Enter" && signInSubmit()}
            />
          </form>
        </FormProvider>
      </div>
      <div className="flex flex-col gap-6 w-full">
        <Button
          color="default"
          variant="outlined"
          size="large"
          onClick={() => signInSubmit()}
        >
          로그인
        </Button>
        <Button
          color="primary"
          variant="solid"
          size="large"
          onClick={() => router.push("/join")}
        >
          회원가입
        </Button>
      </div>
    </>
  );
}
