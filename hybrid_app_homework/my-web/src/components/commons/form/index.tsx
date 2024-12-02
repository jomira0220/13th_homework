"use client";

import {
  FormProvider,
  useForm,
  DefaultValues,
  UseFormReturn,
} from "react-hook-form";
import type { FieldValues } from "react-hook-form";
import { ZodSchema } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface IForm<T extends FieldValues> {
  className?: string;
  children: React.ReactNode;
  schema: ZodSchema<T>;
  defaultValue?: DefaultValues<T>;
  useInitialize: (method: UseFormReturn<T>) => {
    onSubmit: (data: T) => void;
  };
}

export default function Form<T extends FieldValues>({
  className,
  children,
  schema,
  defaultValue,
  useInitialize,
}: IForm<T>) {
  const method = useForm<T>({
    mode: "all",
    resolver: zodResolver(schema),
    defaultValues: defaultValue,
  });

  const { onSubmit } = useInitialize(method);

  return (
    <FormProvider {...method}>
      <form onSubmit={method.handleSubmit(onSubmit)} className={className}>
        {children}
      </form>
    </FormProvider>
  );
}
