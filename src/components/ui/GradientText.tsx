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
        // OPCIÓN C: degradado azul navy → azul claro
        "[background-image:linear-gradient(90deg,#2F62C8_0%,#4F86E6_50%,#2F62C8_100%)]",
        "[background-size:200%_100%]",
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  );
}
