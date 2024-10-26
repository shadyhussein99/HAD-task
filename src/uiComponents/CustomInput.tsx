import { UseFormRegister } from "react-hook-form";

import type { Exam } from "@/types/exam";

type CustomInputProps = {
  inputName: string;
  placeholder?: string;
  textArea?: boolean;
  register: UseFormRegister<Exam>;
};
export function CustomInput({
  inputName,
  placeholder,
  textArea = false,
  register,
}: CustomInputProps) {
  return textArea ? (
    <textarea
      {...register(inputName as keyof Exam)}
      className="border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500   placeholder:leading-[36px]"
      placeholder={placeholder ?? ""}
    />
  ) : (
    <>
      <input
        {...register(inputName as keyof Exam)}
        className="border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={placeholder ?? ""}
      />
    </>
  );
}
