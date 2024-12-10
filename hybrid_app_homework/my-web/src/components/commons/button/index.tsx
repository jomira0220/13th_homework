"use client";

import { ButtonHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";
import type { FieldValues } from "react-hook-form";

interface IButtonBase extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function ButtonBase<T extends FieldValues>({
  children,
  ...rest
}: IButtonBase) {
  const { formState } = useFormContext<T>();
  const isFormValid = formState ? formState.isValid || formState.isDirty : true; // formState의 isValid 값이 true이면 버튼 활성화
  console.log(
    "formContext.formState.isValid",
    formState.isValid,
    formState.isDirty
  );
  return (
    <button disabled={!isFormValid} {...rest}>
      {children}
    </button>
  );
}
