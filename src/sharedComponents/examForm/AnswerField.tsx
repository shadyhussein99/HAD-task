import { UseFormRegister, useFieldArray, Control } from "react-hook-form";

import type { Exam } from "@/types/exam";

import { CustomInput } from "@/uiComponents/CustomInput";
import { CustomRadioButton } from "@/uiComponents/CustomRadioButton";
import { CustomButton } from "@/uiComponents/CustomButton";

type AnswerFieldProps = {
  control: Control<Exam>;
  questionIndex: number;
  setValue: (name: string, value: boolean) => void;
  watch: (name: string) => boolean;
  register: UseFormRegister<Exam>;
};

export function AnswerField({
  control,
  questionIndex,
  setValue,
  watch,
  register,
}: AnswerFieldProps) {
  const {
    fields: answers,
    append: appendAnswer,
    remove: removeAnswer,
  } = useFieldArray({
    control,
    name: `questions.${questionIndex}.answers`,
  });

  const handleAddAnswer = () => {
    appendAnswer({ title: "", isCorrect: false, description: "" });
  };

  const handleRemoveAnswer = (answerIndex: number) => {
    // This ensures that there will always be a correct answer, by default the first one is correct
    if (watch(`questions.${questionIndex}.answers.${answerIndex}.isCorrect`)) {
      if (answerIndex === 0) {
        setValue(`questions.${questionIndex}.answers.1.isCorrect`, true);
      } else {
        setValue(`questions.${questionIndex}.answers.0.isCorrect`, true);
      }
    }
    removeAnswer(answerIndex);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3 mb-2">
        <h4 className="text-lg font-semibold">Answers:</h4>
        <CustomButton
          label="Add Answer"
          onClick={handleAddAnswer}
          className="bg-gray-500 hover:bg-gray-400"
        />
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
            <CustomButton
              label="Remove"
              onClick={() => {
                handleRemoveAnswer(answerIndex);
              }}
              className="bg-red-600 hover:bg-red-500"
            />
          )}
        </div>
      ))}
    </div>
  );
}
