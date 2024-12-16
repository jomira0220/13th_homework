"use client";
import InputBase from "@/components/commons/input";
import { SubTitle, Title, Content } from "@/components/commons/title";
import { ISignupSchema, signupSchema } from "./form.schema";
import Form from "@/components/commons/form";
import { useInitialize } from "./form.initialize";
import {
  ButtonPrimaryMFull,
  ButtonPrimarySFull,
} from "@/components/commons/button";
import styles from "./styles.module.css";
import { useState } from "react";
import { Modal } from "antd";
import Image from "next/image";
import { ICONS } from "@/commons/constants/images";
import { useRouter } from "next/navigation";

export default function SignupSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();
  const handleLoginPage = () => {
    router.push("/login");
  };

  return (
    <div>
      <div className={styles.title_container}>
        <Title title="회원가입" />
        <Content content="회원가입을 위해 필요한 정보를 모두 입력해 주세요." />
      </div>
      <div className={styles.form_container}>
        <Form<ISignupSchema>
          schema={signupSchema}
          useInitialize={(method) => useInitialize(method, setModalOpen)} // setModalOpen 전달
        >
          <InputBase
            isRequired={true}
            name="email"
            inputType="normal"
            label="이메일"
          />
          <InputBase
            isRequired={true}
            name="name"
            inputType="normal"
            label="이름"
          />
          <InputBase
            isRequired={true}
            name="password"
            inputType="normal"
            label="비밀번호"
          />
          <InputBase
            isRequired={true}
            name="passwordCheck"
            inputType="normal"
            label="비밀번호 확인"
          />
          <div className={styles.button_container}>
            <ButtonPrimaryMFull buttonText="가입하기" />
          </div>
        </Form>
        <Modal
          closable={false}
          centered
          className={styles.modal_container}
          open={modalOpen}
          footer={null}
        >
          <div className={styles.modal_body}>
            <Title title="회원가입을 축하드려요" />
            <Image
              className={styles.logo}
              src={ICONS.logo.src}
              alt={ICONS.logo.alt}
              width={0}
              height={0}
            />
            <div className={styles.loginButton_container}>
              <ButtonPrimarySFull
                buttonText="로그인 하기"
                onClick={handleLoginPage}
              />
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
