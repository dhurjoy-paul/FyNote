import { cn } from "@/lib/utils";

export function Input({ className, type, ...props }) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:inline-flex bg-input/30 selection:bg-primary file:bg-transparent disabled:opacity-50 shadow-xs px-3 py-1 border border-input file:border-0 rounded-md outline-none w-full min-w-0 h-9 file:h-7 file:font-medium selection:text-primary-foreground placeholder:text-muted-foreground file:text-foreground md:text-sm file:text-sm text-base",

        // "transition-all",

        "disabled:cursor-not-allowed disabled:pointer-events-none",

        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[1px]",

        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props} />
  );
}
