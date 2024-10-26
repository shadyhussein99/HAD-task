import type { Metadata } from "next";

import { ExamForm } from "@/sharedComponents/examForm/ExamForm";

export const metadata: Metadata = {
  title: "HAD Edit Exam",
  description: "Editing existing exam",
};
type SingleExamProps = {
  params: Promise<{
    id: string;
  }>;
};

async function SingleExam({ params }: SingleExamProps) {
  const { id: examID } = await params;

  return <ExamForm examID={examID} />;
}

export default SingleExam;
