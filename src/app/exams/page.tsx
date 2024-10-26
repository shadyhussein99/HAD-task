import Link from "next/link";

import { ExamsList } from "./_components/examsList/ExamsList";
import { CustomButton } from "@/uiComponents/CustomButton";

function ExamsPage() {
  return (
    <div className="flex flex-col gap-10">
      <div className="relative">
        <h1 className="text-4xl font-bold text-center">Exams</h1>
        <Link href={"/create-exam"} className="absolute top-0 right-0">
          <CustomButton label="Create Exam" />
        </Link>
      </div>

      <section>
        <ExamsList />
      </section>
    </div>
  );
}

export default ExamsPage;
