import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";

export default function Container({
  className,
  children,
  ...rest
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mx-auto w-full max-w-content px-6 md:px-10", className)} {...rest}>
      {children}
    </div>
  );
}
