import { cn } from "@/lib/utils";

type HeadingProps = React.ComponentProps<"h1"> & {
  className?: string;
};

export function H1({ className, ...props }: HeadingProps) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-balance font-extrabold font-heading text-[2.5rem] tracking-tight",
        className,
      )}
      {...props}
    />
  );
}

export function H2({ className, ...props }: HeadingProps) {
  return (
    <h2
      className={cn(
        "scroll-m-20 border-b pb-2 font-heading font-semibold text-[1.75rem] tracking-tight transition-colors",
        className,
      )}
      {...props}
    />
  );
}

export function H3({ className, ...props }: HeadingProps) {
  return (
    <h3
      className={cn(
        "scroll-m-20 font-heading font-semibold text-xl tracking-tight",
        className,
      )}
      {...props}
    />
  );
}
