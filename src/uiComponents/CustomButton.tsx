import React from "react";

type CustomButtonProps = {
  label: string | React.ReactNode;
  type?: "submit" | "reset" | "button";
  className?: string;
  onClick?: () => void;
};

export function CustomButton({
  label,
  type = "button",
  onClick,
  className,
}: CustomButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500 transition duration-200 ${className}`}
    >
      {label}
    </button>
  );
}
