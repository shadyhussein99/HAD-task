"use client";

import { useState, useEffect } from "react";

import { ExamsCard } from "./ExamsCard";

import { examSample } from "@/dummyData/examSample";
import type { Exam } from "@/types/exam";

export function ExamsList() {
  const [examsList, setExamsList] = useState<Exam[] | []>([]);

  // To initially add the default exam in local storage
  useEffect(() => {
    const localStorageExams: Exam[] =
      JSON.parse(window.localStorage.getItem("exams") || "[]") ?? [];

    if (localStorageExams?.length === 0) {
      window.localStorage.setItem("exams", JSON.stringify([examSample]));
    }
    setExamsList(localStorageExams);
  }, []);

  return (
    <div>
      {examsList.map((exam) => (
        <div key={exam.id} className="mb-4">
          <ExamsCard exam={exam} />
        </div>
      ))}
    </div>
  );
}
