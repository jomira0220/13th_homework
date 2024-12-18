"use client";

import Form from "@/components/commons/form";
import { Input } from "@/components/commons/input";
import { signUpSchema } from "@/commons/schema/signup";
import type { ISignUpSchema } from "@/commons/schema/signup";
import { SubmitButton } from "@/components/commons/button";
import { useSignUp } from "@/app/signup/hook";
import Modal from "@/components/commons/modal";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function SignUpForm() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Form<ISignUpSchema>
      schema={signUpSchema}
      methodsSet={(methods) => useSignUp(methods, setModalOpen)}
      className="w-full flex flex-col gap-3"
    >
      <Input<ISignUpSchema>
        type="text"
        name="email"
        title="이메일"
        placeholder="이메일을 입력해주세요."
        required
        isError
      />

      <Input<ISignUpSchema>
        type="text"
        name="name"
        title="이름"
        placeholder="이름을 입력해주세요."
        required
        isError
      />

      <Input<ISignUpSchema>
        type="password"
        name="password"
        title="비밀번호"
        placeholder="비밀번호를 입력해주세요."
        required
        isError
      />

      <Input<ISignUpSchema>
        type="password"
        name="passwordCheck"
        title="비밀번호 확인"
        placeholder="비밀번호를 다시 입력해주세요."
        required
        isError
      />

      <Modal modalHandler={{ modalOpen, setModalOpen }} isClose={"rightTop"}>
        <div className="flex flex-col gap-6 items-center justify-center p-4">
          <div className="flex flex-col items-center gap-3">
            <p className="font-semibold text-lg">회원가입을 축하드립니다!</p>
            <Image
              src="./icons/logo.svg"
              alt="회원가입 완료"
              width="77"
              height="48"
            />
          </div>

          <Link
            href="/login"
            className="bg-[--primary] text-white p-2 rounded-md font-bold text-sm min-w-[7.5rem] text-center"
          >
            로그인 하기
          </Link>
        </div>
      </Modal>

      <div className="flex flex-col gap-3 items-center">
        <SubmitButton className="button-primary disabled:button-primary-off">
          가입하기
        </SubmitButton>
      </div>
    </Form>
  );
}
