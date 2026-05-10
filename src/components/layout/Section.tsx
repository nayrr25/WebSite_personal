import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";
import Container from "./Container";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  id?: string;
  containerClassName?: string;
  bare?: boolean;
}

export default function Section({
  id,
  className,
  containerClassName,
  bare = false,
  children,
  ...rest
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn("relative py-32 md:py-40", className)}
      {...rest}
    >
      {bare ? children : <Container className={containerClassName}>{children}</Container>}
    </section>
  );
}
