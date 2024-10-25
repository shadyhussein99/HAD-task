import { ExamForm } from "@/components/examForm/ExamForm";

function CreateExam() {
  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-4xl font-bold text-center">Create Exam</h1>

      <ExamForm />
    </div>
  );
}

export default CreateExam;
