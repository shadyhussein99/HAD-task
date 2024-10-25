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
  console.log("examsList", examsList);
  return (
    <div>
      {examsList.map((exam) => (
        <ExamsCard key={exam.id} exam={exam} />
      ))}
    </div>
  );
}
