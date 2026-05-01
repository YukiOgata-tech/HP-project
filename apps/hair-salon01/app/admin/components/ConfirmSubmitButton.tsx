"use client";

interface ConfirmSubmitButtonProps {
  className?: string;
  children: React.ReactNode;
  confirmMessage: string;
}

export function ConfirmSubmitButton({
  className,
  children,
  confirmMessage,
}: ConfirmSubmitButtonProps) {
  return (
    <button
      type="submit"
      className={className}
      onClick={(e) => {
        if (!window.confirm(confirmMessage)) {
          e.preventDefault();
        }
      }}
    >
      {children}
    </button>
  );
}
