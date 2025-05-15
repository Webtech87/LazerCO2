import * as React from "react";
import { cn } from "@/lib/utils";

interface CTAButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const CTAButton = React.forwardRef<HTMLButtonElement, CTAButtonProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "text-[#1E52CC] text-xs font-bold leading-[14.4px] tracking-[1.2px] uppercase h-full w-full",
          "bg-[#E8F9FC] shadow-[0px_-4px_16.8px_0px_#2667FF] cursor-pointer",
          "duration-200 px-[30px] py-[13px] rounded-[50px]",
          "hover:bg-[#d9f5fa] hover:shadow-[0px_-4px_20px_0px_#2667FF]",
          "active:transform active:translate-y-0.5",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

CTAButton.displayName = "CTAButton";

export { CTAButton };