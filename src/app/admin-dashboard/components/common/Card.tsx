import { ReactNode } from "react"

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({
  children,
  className = "",
}: CardProps) {
  return (
    <div
      className={`bg-white rounded-xl border border-gray-100 p-5 ${className}`}
    >
      {children}
    </div>
  );
}