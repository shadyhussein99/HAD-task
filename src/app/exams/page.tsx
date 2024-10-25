import { ExamsList } from "./_components/examsList/ExamsList";

function ExamsPage() {
  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-4xl font-bold text-center">Exams</h1>

      <section>
        <ExamsList />
      </section>
    </div>
  );
}

export default ExamsPage;
