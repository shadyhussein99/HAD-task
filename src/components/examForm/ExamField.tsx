import { UseFormRegister } from "react-hook-form";

import type { Exam } from "@/types/exam";

import { CustomInput } from "../CustomInput";

type ExamFieldProps = {
  label?: string;
  inputName: string;
  placeholder?: string;
  textArea?: boolean;
  register: UseFormRegister<Exam>;
};

export function ExamField({
  label,
  inputName,
  textArea = false,
  placeholder,
  register,
}: ExamFieldProps) {
  return (
    <div>
      <section className=" flex items-center gap-2">
        {label && (
          <h3 className="text-lg font-semibold text-nowrap">{label}</h3>
        )}

        <CustomInput
          inputName={inputName}
          placeholder={placeholder}
          textArea={textArea}
          register={register}
        />
      </section>
    </div>
  );
}
