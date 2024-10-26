type ExamsInformationProps = {
  label: string;
  value: string;
};

export function ExamInformation({ label, value }: ExamsInformationProps) {
  return (
    <section className=" flex items-center gap-2">
      <h3 className="text-lg font-semibold">{label}</h3>
      <p>{value}</p>
    </section>
  );
}
