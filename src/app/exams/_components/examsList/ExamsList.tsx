"use client";

import { useEffect } from "react";

import { ExamsCard } from "./ExamsCard";

import { examSample } from "@/dummyData/examSample";
import type { Exam } from "@/types/exam";

export function ExamsList() {
  const examsList: Exam[] = JSON.parse(
    window.localStorage.getItem("exams") || "[]"
  );

  // To initially add the default exam in local storage
  useEffect(() => {
    window.localStorage.setItem("exams", JSON.stringify([examSample]));
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
