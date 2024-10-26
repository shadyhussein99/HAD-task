"use client";

import { useState, useEffect } from "react";

import { useRouter } from "next/navigation";

import * as yup from "yup";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import toast, { Toaster } from "react-hot-toast";

import { validationSchema } from "./validationSchema";

import { ExamField } from "./ExamField";
import type { Exam } from "@/types/exam";
import { AnswerField } from "./AnswerField";
import { CustomButton } from "@/uiComponents/CustomButton";

type ExamFormProps = {
  examID?: string;
};

export function ExamForm({ examID }: ExamFormProps) {
  const [examsList, setExamsList] = useState<Exam[]>([]);
  const [editedExam, setEditedExam] = useState<Exam | object>({});
  const [editedExamIndex, setEditedExamIndex] = useState<number | null>(null);

  useEffect(() => {
    const localStorageExams: Exam[] = JSON.parse(
      window.localStorage.getItem("exams") || "[]"
    );
    const requiredExam = localStorageExams.find(
      (exam: Exam) => exam.id === Number(examID)
    );
    const editedExamIndex = localStorageExams.findIndex(
      (exam: Exam) => exam.id === requiredExam?.id
    );
    setExamsList(localStorageExams);
    setEditedExam(requiredExam ?? {});
    setEditedExamIndex(editedExamIndex);
  }, [examID]);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    formState: { errors, isValid },
  } = useForm<Exam>({
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
    resolver: yupResolver(validationSchema as yup.ObjectSchema<Exam>),
    mode: "onChange",
  });

  const {
    fields: questions,
    append: appendQuestion,
    remove: removeQuestion,
  } = useFieldArray({
    control,
    name: "questions",
  });

  const handleDeleteExam = () => {
    if (editedExamIndex !== null) {
      examsList.splice(editedExamIndex, 1);
      localStorage.setItem("exams", JSON.stringify(examsList));
      toast.success("Deleted exam successfully");
      router.push("/exams");
    }
  };

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
    if (examID && editedExamIndex !== null) {
      examsList[editedExamIndex] = data;
    } else {
      examsList.push(data);
    }
    localStorage.setItem("exams", JSON.stringify(examsList));
    toast.success(`${examID ? "Edited" : "Created"} exam successfully`);
    router.push("/exams");
  };

  useEffect(() => {
    if (examID && editedExam) {
      setValue("title", (editedExam as Exam)?.title || "");
      setValue("description", (editedExam as Exam)?.description || "");
      setValue("questions", (editedExam as Exam)?.questions || []);
    }
  }, [setValue, examID, editedExam]);

  return (
    <>
      <Toaster />
      <div className="flex flex-col gap-10">
        <div className="relative">
          <h1 className="text-4xl font-bold text-center">
            {examID ? "Edit" : "Create"} Exam
          </h1>

          <div className="absolute top-0 right-0">
            {examID && (
              <CustomButton
                label="Delete Exam"
                onClick={handleDeleteExam}
                className="bg-red-600 hover:bg-red-500 me-4"
              />
            )}

            <CustomButton
              label="Back to Exams List"
              onClick={() => router.push("/exams")}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6 border-2 rounded-lg border-gray-300 p-6 mx-auto md:w-[80%] xl:w-[50%]">
            <ExamField
              label="Title: "
              inputName="title"
              placeholder="Exam Title"
              register={register}
              error={errors.title?.message}
            />
            <ExamField
              label="Description: "
              inputName="description"
              textArea
              placeholder="Exam Description"
              register={register}
              error={errors.description?.message}
            />

            <div className="flex items-center gap-3">
              <h3 className="text-lg font-semibold text-nowrap">Questions:</h3>
              <CustomButton
                label="Add Question"
                onClick={handleAddQuestion}
                className="bg-gray-500 hover:bg-gray-400"
              />
            </div>

            {/* Validation for questions */}
            {errors.questions?.root?.message && (
              <p className="text-red-500 text-sm my-1">
                {errors.questions?.root?.message}
              </p>
            )}

            {questions.map((question, index) => (
              <div key={question.id} className="mb-4 flex flex-col gap-2">
                <ExamField
                  label={`Q${index + 1}) `}
                  inputName={`questions.${index}.title`}
                  textArea
                  placeholder={`Question ${index + 1}`}
                  register={register}
                  error={errors.questions?.[index]?.title?.message}
                />
                <ExamField
                  label={`D${index + 1}) `}
                  inputName={`questions.${index}.description`}
                  textArea
                  placeholder={`Description ${index + 1}`}
                  register={register}
                  error={errors.questions?.[index]?.description?.message}
                />
                <AnswerField
                  control={control}
                  questionIndex={index}
                  setValue={setValue as (name: string, value: boolean) => void}
                  watch={watch}
                  register={register}
                  errors={errors}
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

            <CustomButton label="Submit" type="submit" disabled={!isValid} />
          </div>
        </form>
      </div>
    </>
  );
}
