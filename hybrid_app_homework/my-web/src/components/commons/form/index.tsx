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
  methodsSet: (methods: UseFormReturn<T>) => { onSubmit: (data: T) => void };
}

export default function Form<T extends FieldValues>({
  className,
  children,
  schema,
  defaultValue,
  methodsSet,
}: IForm<T>) {
  const methods = useForm<T>({
    mode: "all",
    resolver: zodResolver(schema),
    defaultValues: defaultValue,
  });

  const { onSubmit } = methodsSet(methods);

  return (
    <>
      <FormProvider {...methods}>
        <form className={className} onSubmit={methods.handleSubmit(onSubmit)}>
          {children}
        </form>
      </FormProvider>
    </>
  );
}
