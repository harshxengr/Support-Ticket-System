import { cn } from "@/lib/utils";
import type { PropsWithChildren } from "react";

export function PageContainer({ children, className }: PropsWithChildren<{ className?: string }>) {
  return <section className={cn("mx-auto w-full max-w-7xl space-y-6 px-4 py-6 md:px-6", className)}>{children}</section>;
}
