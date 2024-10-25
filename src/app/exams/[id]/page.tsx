import { ExamForm } from "./_components/ExamForm";

type SingleExamProps = {
  params: {
    id: string;
  };
};

async function SingleExam({ params }: SingleExamProps) {
  const { id: examID } = await params;

  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-4xl font-bold text-center">Modify Exam</h1>
      <ExamForm />
    </div>
  );
}

export default SingleExam;
