"use client";

import { useFormContext } from "react-hook-form";
import type { FieldValues, Path } from "react-hook-form";
import {
  useState,
  type HTMLInputTypeAttribute,
  type InputHTMLAttributes,
} from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface IInputProps<T> extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  placeholder?: string;
  readOnly?: boolean;
  title?: string;
  type: HTMLInputTypeAttribute;
  name: Path<T>;
  isError?: boolean;
  hidden?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

function BaseInput<T extends FieldValues>({
  placeholder,
  readOnly,
  title,
  type,
  name,
  isError = false,
  hidden = false,
  required,
  ...rest
}: IInputProps<T>) {
  const { register, formState } = useFormContext<T>();
  const [isPassword, setIsPassword] = useState<boolean>(false);

  return (
    <label className="flex flex-col gap-2">
      {title && (
        <div className="flex items-start">
          <span className="font-semibold text-xs leading-[1.25rem]">
            {title}
          </span>
          {required && <span className="text-red-600 leading-none">*</span>}
        </div>
      )}
      <div className="relative">
        <input
          className="h-11 font-medium rounded-lg border border-gray-200 px-4 placeholder:text-gray-400 w-full"
          type={type === "password" ? (isPassword ? "text" : "password") : type}
          placeholder={placeholder}
          readOnly={readOnly}
          hidden={hidden}
          {...register(name, {
            required: required,
          })}
          {...rest}
        />
        {type === "password" && (
          <div
            className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
            onClick={() => setIsPassword(!isPassword)}
          >
            {isPassword ? <FaEye color="#777" /> : <FaEyeSlash color="#777" />}
          </div>
        )}
      </div>

      {isError && formState.errors[name]?.message?.toString() && (
        <div className="text-red-600 font-medium text-xs">
          {formState.errors[name]?.message?.toString()}
        </div>
      )}
    </label>
  );
}

export function Input<T extends FieldValues>(props: IInputProps<T>) {
  console.log("Input", props);
  return <BaseInput<T> {...props} />;
}
