"use client";

import { useFormContext } from "react-hook-form";

interface IInputProps {
  className?: string;
  placeholder?: string;
  readOnly?: boolean;
  title?: string;
  type: string;
  name: string;
  isError?: boolean;
  hidden?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

export default function Input({
  placeholder,
  readOnly,
  title,
  type,
  name,
  isError = false,
  hidden = false,
  required,
}: IInputProps) {
  const { register, formState } = useFormContext();

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
      <input
        className="h-11 font-medium rounded-lg border border-gray-200 px-4 placeholder:text-gray-400"
        type={type}
        placeholder={placeholder}
        readOnly={readOnly}
        hidden={hidden}
        {...register(name, {
          required: required,
        })}
      />

      {isError && formState.errors && (
        <div className="text-red-600">
          {formState.errors[name]?.message?.toString()}
        </div>
      )}
    </label>
  );
}
