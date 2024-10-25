import { UseFormRegister, useFieldArray, Control } from "react-hook-form";

import type { Exam } from "@/types/exam";

import { CustomInput } from "../CustomInput";
import { CustomRadioButton } from "../CustomRadioButton";

type AnswersFieldProps = {
  control: Control<Exam>;
  questionIndex: number;
  setValue: (name: string, value: boolean) => void;
  watch: (name: string) => boolean;
  register: UseFormRegister<Exam>;
};

export function AnswersField({
  control,
  questionIndex,
  setValue,
  watch,
  register,
}: AnswersFieldProps) {
  const {
    fields: answers,
    append: appendAnswer,
    remove: removeAnswer,
  } = useFieldArray({
    control,
    name: `questions.${questionIndex}.answers`,
  });
  console.log("answers", answers);
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3 mb-2">
        <h4 className="text-lg font-semibold">Answers:</h4>
        <button
          type="button"
          className="bg-gray-500 text-white py-1 px-6 rounded hover:bg-gray-400"
          onClick={() =>
            appendAnswer({ title: "", isCorrect: false, description: "" })
          }
        >
          Add Answer
        </button>
      </div>

      {answers.map((answer, answerIndex) => (
        <div key={answer.id} className="flex items-center gap-2">
          <CustomInput
            inputName={`questions.${questionIndex}.answers.${answerIndex}.title`}
            placeholder={`Answer ${answerIndex + 1}`}
            register={register}
          />
          <CustomInput
            inputName={`questions.${questionIndex}.answers.${answerIndex}.description`}
            placeholder={`Description for Answer ${answerIndex + 1}`}
            register={register}
          />

          <CustomRadioButton
            inputName={`questions.${questionIndex}.answers.${answerIndex}.isCorrect`}
            label="Correct"
            handleClick={() => {
              answers.forEach((_, index) => {
                setValue(
                  `questions.${questionIndex}.answers.${index}.isCorrect`,
                  false
                );
              });
              setValue(
                `questions.${questionIndex}.answers.${answerIndex}.isCorrect`,
                true
              );
            }}
            checked={watch(
              `questions.${questionIndex}.answers.${answerIndex}.isCorrect`
            )}
          />

          {answers.length > 2 && (
            <button
              type="button"
              className="bg-red-600 text-white py-1 px-4 rounded hover:bg-red-500"
              onClick={() => {
                if (
                  watch(
                    `questions.${questionIndex}.answers.${answerIndex}.isCorrect`
                  )
                ) {
                  setValue(
                    `questions.${questionIndex}.answers.0.isCorrect`,
                    true
                  );
                }
                removeAnswer(answerIndex);
              }}
            >
              Remove
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
