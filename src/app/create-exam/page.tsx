import type { Metadata } from "next";

import { ExamForm } from "@/sharedComponents/examForm/ExamForm";

export const metadata: Metadata = {
  title: "HAD Create Exam",
  description: "Creating new exam",
};

function CreateExam() {
  return <ExamForm />;
}

export default CreateExam;
