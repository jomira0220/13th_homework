"use client";
import Form from "@/components/commons/form";
import { ILoginSchema, loginSchema } from "./form.schema";
import { useInitialize } from "./form.initialize";
import {
  InputNormalWithLabelRequired,
  InputPasswordWithLabelRequired,
} from "@/components/commons/input";
import {
  ButtonLightSFull,
  ButtonPrimaryMFull,
} from "@/components/commons/button";
import styles from "./styles.module.css";
import { Title } from "@/components/commons/title";

import { useRouter } from "next/navigation";
export default function LoginSection() {
  const router = useRouter();
  return (
    <div>
      <div className={styles.title_container}>
        <Title title="로그인" />
      </div>
      <div>
        <div className={styles.form_container}>
          <Form<ILoginSchema>
            schema={loginSchema}
            useInitialize={useInitialize}
          >
            <InputNormalWithLabelRequired name="email" label="이메일" />
            <InputPasswordWithLabelRequired name="password" label="비밀번호" />
            <div className={styles.button_container}>
              <ButtonPrimaryMFull buttonText="로그인" />
              <ButtonLightSFull
                buttonText="회원가입"
                type="button"
                onClick={(event) => {
                  event.preventDefault();
                  router.push("/signup");
                }}
              />
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
