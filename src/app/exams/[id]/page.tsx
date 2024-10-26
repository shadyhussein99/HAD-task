// import { ExamForm } from "../../components/examForm/ExamForm";

type SingleExamProps = {
  params: Promise<{
    id: string;
  }>;
};

async function SingleExam({ params }: SingleExamProps) {
  const { id: examID } = await params;
  console.log(examID);

  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-4xl font-bold text-center">Edit Exam</h1>

      {/* <ExamForm examID={examID} /> */}
    </div>
  );
}

export default SingleExam;
