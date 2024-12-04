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
  methodsSet?: (methods?: UseFormReturn<T>) => void;
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

  const onSubmit = (data: T) => {
    console.log("data", data);
  };

  methodsSet && methodsSet(methods);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className={className}>
        {children}
      </form>
    </FormProvider>
  );
}
