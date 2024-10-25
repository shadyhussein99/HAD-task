type ExamsCardFieldProps = {
  label: string;
  value: string;
};

export function ExamsCardField({ label, value }: ExamsCardFieldProps) {
  return (
    <section className=" flex items-center gap-2">
      <h3 className="text-lg font-semibold">{label}</h3>
      <p>{value}</p>
    </section>
  );
}
