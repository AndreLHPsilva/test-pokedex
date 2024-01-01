import { ButtonHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "reset" | "submit";
  isDisabled?: boolean;
}

export function Button({
  children,
  className,
  onClick,
  isDisabled = false,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={twMerge(
        "px-3 py-2 border rounded shadow transition-all",
        className
      )}
      {...props}
      onClick={onClick}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
}
