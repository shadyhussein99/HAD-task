"use client";

import { useRouter } from "next/navigation";

import { useForm, useFieldArray } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import toast, { Toaster } from "react-hot-toast";

import { ExamField } from "./ExamField";
import type { Exam } from "@/types/exam";
import { AnswerField } from "./AnswerField";
import { CustomButton } from "@/uiComponents/CustomButton";

type ExamFormProps = {
  examID?: string;
};

const validationSchema = yup.object().shape({
  title: yup.string().required(" Exam Title is required"),
  description: yup.string().optional(),
  questions: yup
    .array()
    .of(
      yup.object().shape({
        title: yup.string().required("Question title is required"),
        description: yup.string().optional(),
        answers: yup
          .array()
          .of(
            yup.object().shape({
              title: yup.string().required("Answer is required"),
              isCorrect: yup.boolean().required(),
              description: yup.string().optional(),
            })
          )
          .min(2, "At least two answers are required"),
      })
    )
    .required("At least one question is required"),
});

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
    // resolver: yupResolver(validationSchema),
  });

  const {
    fields: questions,
    append: appendQuestion,
    remove: removeQuestion,
  } = useFieldArray({
    control,
    name: "questions",
  });

  const handleAddQuestion = () => {
    appendQuestion({
      id: Date.now(),
      title: "",
      answers: [
        { title: "", isCorrect: true, description: "" },
        { title: "", isCorrect: false, description: "" },
      ],
      description: "",
    });
  };

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
      <div className="flex flex-col gap-10">
        <div className="flex items-center justify-center relative">
          <h1 className="text-4xl font-bold text-center">
            {examID ? "Edit" : "Create"} Exam
          </h1>
          <CustomButton
            label="Back to Exams List"
            onClick={() => router.push("/exams")}
            className="absolute right-0"
          />
        </div>

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
              <CustomButton
                label="Add Question"
                onClick={handleAddQuestion}
                className="bg-gray-500 hover:bg-gray-400"
              />
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
                <AnswerField
                  control={control}
                  questionIndex={index}
                  setValue={setValue as (name: string, value: boolean) => void}
                  watch={watch}
                  register={register}
                />

                <div className="flex justify-end">
                  <CustomButton
                    label="Remove Question"
                    onClick={() => removeQuestion(index)}
                    className="bg-red-600 hover:bg-red-500 "
                  />
                </div>
              </div>
            ))}

            <CustomButton label="Submit" type="submit" />
          </div>
        </form>
      </div>
    </>
  );
}
