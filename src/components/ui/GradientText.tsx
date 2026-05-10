import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";

export default function GradientText({
  className,
  children,
  ...rest
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "bg-clip-text text-transparent animate-gradient-shift",
        "[background-image:linear-gradient(90deg,#5EE9F0_0%,#7CF5C4_50%,#5EE9F0_100%)]",
        "[background-size:200%_100%]",
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  );
}
