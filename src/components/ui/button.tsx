// Button component for hazo_ui library
// Based on shadcn/ui button component
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

// Inline style fallbacks keyed by variant
// These bypass Tailwind's color utility compilation so buttons render correctly
// regardless of the consuming project's Tailwind version or CSS variable format
const variant_styles: Record<string, React.CSSProperties> = {
  default: {
    backgroundColor: "var(--primary)",
    color: "var(--primary-foreground)",
    border: "1px solid var(--primary)",
  },
  destructive: {
    backgroundColor: "var(--destructive)",
    color: "white",
    border: "1px solid var(--destructive)",
  },
  outline: {
    backgroundColor: "var(--background)",
    color: "var(--foreground)",
    border: "1px solid var(--border)",
  },
  secondary: {
    backgroundColor: "var(--secondary)",
    color: "var(--secondary-foreground)",
  },
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, style, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const fallback_styles = variant_styles[variant ?? "default"] ?? {};
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        style={{ ...fallback_styles, ...style }}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

