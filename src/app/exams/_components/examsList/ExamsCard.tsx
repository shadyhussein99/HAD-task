import Link from "next/link";

import { ExamInformation } from "@/sharedComponents/ExamInformation";

import type { Exam } from "@/types/exam";

type ExamCardProps = { exam: Exam };

export function ExamsCard({ exam }: ExamCardProps) {
  return (
    <Link className="flex flex-col gap-2" href={`/exams/${exam.id}`}>
      <section className="border-2 rounded-lg border-gray-300 p-4 cursor-pointer hover:bg-gray-100 ">
        <ExamInformation label="Exam Title: " value={exam.title} />
        {exam.description && (
          <ExamInformation
            label="Exam Description: "
            value={exam.description}
          />
        )}
      </section>
    </Link>
  );
}
