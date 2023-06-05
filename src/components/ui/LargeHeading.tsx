import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { HTMLAttributes, forwardRef } from "react";

const largeHeadingVariants = cva(
  "text-back dark:text-white text-center lg:text-left font-extrabold leading-tight tracking-tighter",
  {
    variants: {
      size: {
        default: "text-4xl md:text-5xl lg:text-6xl",
        sm: "text-2xl md:text-3xl lg:text-4xl",
        lg: "text-5xl md:text-6xl lg:text-7xl",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

interface LargeHeadingProps
  extends HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof largeHeadingVariants> {}

const LargeHeading = forwardRef<HTMLHeadingElement, LargeHeadingProps>(
  ({ className, children, size, ...props }, ref) => {
    return (
      <h1
        ref={ref}
        {...props}
        className={cn(largeHeadingVariants({ size, className }))}
      >
        {children}
      </h1>
    );
  }
);

export default LargeHeading;
