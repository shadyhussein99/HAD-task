"use client";

import { useForm } from "react-hook-form";

type CustomRadioButtonProps = {
  inputName: string;
  label: string;
  handleClick: () => void;
  checked: boolean;
};

type Inputs = {
  [key: string]: string;
};

export function CustomRadioButton({
  inputName,
  label,
  handleClick,
  checked,
}: CustomRadioButtonProps) {
  const { register } = useForm<Inputs>();

  return (
    <>
      <input
        type="radio"
        {...register(inputName)}
        onClick={handleClick}
        checked={checked}
        className="ml-2"
      />
      <label className="ml-1">{label}</label>
    </>
  );
}
