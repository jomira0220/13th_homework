"use client";

import { useFormContext } from "react-hook-form";

interface ITextAreaProps {
  title?: string;
  placeholder?: string;
  name: string;
  isError?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
}

export default function TextArea({
  title,
  placeholder,
  name,
  isError = false,
  onChange,
  required,
}: ITextAreaProps) {
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

      <textarea
        className="font-medium h-[9.25rem] rounded-lg border border-gray-200 p-4 placeholder:text-gray-400"
        placeholder={placeholder}
        {...register(name, {
          required: required,
          minLength: {
            value: 1,
            message: placeholder || "",
          },
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
