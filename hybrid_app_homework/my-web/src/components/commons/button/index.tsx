"use client";

import { usePathname } from "next/navigation";
import { ButtonHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";
import type { FieldValues } from "react-hook-form";

interface IButtonBase extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function SubmitButton<T extends FieldValues>({
  children,
  onClick,
  ...rest
}: IButtonBase) {
  const pathname = usePathname();
  const { formState } = useFormContext<T>();
  const formStateCheck = pathname.includes("edit")
    ? formState.isValid || formState.isDirty
    : formState.isValid && formState.isDirty;
  // isValid : 폼의 유효성 검사를 통과했는지 여부
  // isDirty : 폼의 값이 변경되었는지 여부
  const isFormDisabled = formState ? formStateCheck : true;

  return (
    <button disabled={!isFormDisabled} {...rest}>
      {children}
    </button>
  );
}
