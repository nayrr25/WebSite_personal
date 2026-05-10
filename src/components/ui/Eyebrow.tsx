import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";

export default function Eyebrow({
  className,
  children,
  ...rest
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 text-eyebrow",
        className,
      )}
      {...rest}
    >
      <span
        aria-hidden
        className="h-px w-6 bg-accent-cyan/60"
      />
      <span>{children}</span>
    </div>
  );
}
