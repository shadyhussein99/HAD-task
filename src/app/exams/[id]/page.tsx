import { ExamForm } from "@/sharedComponents/examForm/ExamForm";

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
