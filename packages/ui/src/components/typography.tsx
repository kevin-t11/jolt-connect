import { cn } from "../lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import * as React from "react";

const typographyVariants = cva(
  "text-gray-900 dark:text-gray-100",
  {
    variants: {
      variant: {
        h1: "text-4xl font-bold",
        h2: "text-3xl font-semibold",
        h3: "text-2xl font-medium",
        h4: "text-xl font-medium",
        h5: "text-lg font-medium",
        h6: "text-base font-medium",
        p: "text-base",
        span: "text-sm",
      },
    },
    defaultVariants: {
      variant: "p",
    },
  }
);

export interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {}

const Typography = React.forwardRef<HTMLParagraphElement, TypographyProps >(
  ({ className, variant, ...props }, ref) => {
    const Component = variant === "span" ? "span" : "p";
    return (
      <Component
        ref={ref}
        className={cn(typographyVariants({ variant }), className)}
        {...props}
      />
    );
  }
);

Typography.displayName = "Typography";

export { Typography, typographyVariants };
