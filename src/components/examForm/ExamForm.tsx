"use client";

import { useRouter } from "next/navigation";

import { useForm, useFieldArray } from "react-hook-form";

import toast, { Toaster } from "react-hot-toast";

import { ExamField } from "./ExamField";
import type { Exam } from "@/types/exam";
import { AnswersField } from "./AnswerField";

type ExamFormProps = {
  examID?: string;
};

export function ExamForm({ examID }: ExamFormProps) {
  const router = useRouter();
  const { register, handleSubmit, setValue, control, watch } = useForm<Exam>({
    defaultValues: {
      id: Date.now(),
      title: "",
      description: "",
      questions: [
        {
          id: Date.now(),
          title: "",
          answers: [
            { title: "", isCorrect: true, description: "" },
            { title: "", isCorrect: false, description: "" },
          ],
          description: "",
        },
      ],
    },
  });

  const {
    fields: questions,
    append: appendQuestion,
    remove: removeQuestion,
  } = useFieldArray({
    control,
    name: "questions",
  });

  const onSubmit = (data: Exam) => {
    const previousExams = window.localStorage.getItem("exams");
    if (previousExams) {
      const parsedExams = JSON.parse(previousExams);
      parsedExams.push(data);
      window.localStorage.setItem("exams", JSON.stringify(parsedExams));
      toast.success("Created exam successfully");
      router.push("/exams");
    }
  };

  return (
    <>
      <Toaster />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6 border-2 rounded-lg border-gray-300 p-6 mx-auto md:w-[80%] xl:w-[50%]">
          <ExamField
            label="Title: "
            inputName="title"
            placeholder="Exam Title"
            register={register}
          />
          <ExamField
            label="Description: "
            inputName="description"
            textArea
            placeholder="Exam Description"
            register={register}
          />

          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold text-nowrap">Questions:</h3>
            <button
              type="button"
              className="bg-gray-500 text-white py-1 px-6 rounded hover:bg-gray-400"
              onClick={() =>
                appendQuestion({
                  id: Date.now(),
                  title: "",
                  answers: [
                    { title: "", isCorrect: true, description: "" },
                    { title: "", isCorrect: false, description: "" },
                  ],
                  description: "",
                })
              }
            >
              Add Question
            </button>
          </div>

          {questions.map((question, index) => (
            <div key={question.id} className="mb-4 flex flex-col gap-2">
              <ExamField
                label={`Q${index + 1}) `}
                inputName={`questions.${index}.title`}
                textArea
                placeholder={`Question ${index + 1}`}
                register={register}
              />
              <ExamField
                label={`D${index + 1}) `}
                inputName={`questions.${index}.description`}
                textArea
                placeholder={`Description ${index + 1}`}
                register={register}
              />
              <AnswersField
                control={control}
                questionIndex={index}
                setValue={setValue as (name: string, value: boolean) => void}
                watch={watch}
                register={register}
              />

              <div className="flex justify-end">
                <button
                  onClick={() => removeQuestion(index)}
                  className="bg-red-600 text-white py-1 px-6 rounded ml-auto hover:bg-red-500"
                >
                  Remove Question
                </button>
              </div>
            </div>
          ))}

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500 transition duration-200"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
}
