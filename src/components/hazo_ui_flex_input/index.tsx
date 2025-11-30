"use client";

/**
 * Hazo UI Flex Input Component
 * 
 * Enhanced input component with type validation, character restrictions, and error messaging.
 * Extends shadcn Input component with additional validation props.
 */

import * as React from "react";
import { Input, type InputProps } from "../ui/input";
import { cn } from "../../lib/utils";

export interface HazoUiFlexInputProps extends Omit<InputProps, "type"> {
  input_type?: "mixed" | "numeric" | "email" | "alpha";
  text_len_min?: number;
  text_len_max?: number;
  num_min?: number;
  num_max?: number;
  regex?: string | RegExp;
  num_decimals?: number;
  format_guide?: string;
  format_guide_info?: boolean;
}

/**
 * Validate input value based on input_type and constraints
 */
function validateInput(
  value: string,
  input_type: "mixed" | "numeric" | "email" | "alpha",
  text_len_min?: number,
  text_len_max?: number,
  num_min?: number,
  num_max?: number,
  regex?: string | RegExp,
  num_decimals?: number
): { isValid: boolean; errorMessage?: string } {
  // Empty value validation
  if (value === "") {
    return { isValid: true };
  }

  // Type-specific validation
  switch (input_type) {
    case "numeric": {
      // Check if value is a valid number
      const numValue = parseFloat(value);
      if (isNaN(numValue)) {
        return { isValid: false, errorMessage: "Must be a valid number" };
      }

      // Check decimal places
      if (num_decimals !== undefined) {
        const decimalPlaces = value.split(".")[1]?.length || 0;
        if (decimalPlaces > num_decimals) {
          return {
            isValid: false,
            errorMessage: `Maximum ${num_decimals} decimal place${num_decimals !== 1 ? "s" : ""} allowed`,
          };
        }
      }

      // Check min/max
      if (num_min !== undefined && numValue < num_min) {
        return { isValid: false, errorMessage: `Must be at least ${num_min}` };
      }
      if (num_max !== undefined && numValue > num_max) {
        return { isValid: false, errorMessage: `Must be at most ${num_max}` };
      }
      break;
    }

    case "alpha": {
      // Check if value contains only letters
      const alphaRegex = /^[A-Za-z\s]*$/;
      if (!alphaRegex.test(value)) {
        return { isValid: false, errorMessage: "Only letters are allowed" };
      }
      break;
    }

    case "email": {
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return { isValid: false, errorMessage: "Must be a valid email address" };
      }
      break;
    }

    case "mixed": {
      // Check length constraints
      if (text_len_min !== undefined && value.length < text_len_min) {
        return {
          isValid: false,
          errorMessage: `Must be at least ${text_len_min} character${text_len_min !== 1 ? "s" : ""}`,
        };
      }
      if (text_len_max !== undefined && value.length > text_len_max) {
        return {
          isValid: false,
          errorMessage: `Must be at most ${text_len_max} character${text_len_max !== 1 ? "s" : ""}`,
        };
      }
      break;
    }
  }

  // Regex validation (applies to all types if provided)
  if (regex) {
    const regexPattern = typeof regex === "string" ? new RegExp(regex) : regex;
    if (!regexPattern.test(value)) {
      return { isValid: false, errorMessage: "Invalid format" };
    }
  }

  return { isValid: true };
}

/**
 * Filter input value based on input_type to prevent invalid characters
 */
function filterInputValue(
  value: string,
  input_type: "mixed" | "numeric" | "email" | "alpha",
  num_decimals?: number
): string {
  switch (input_type) {
    case "numeric": {
      // Allow digits, decimal point, and minus sign
      let filtered = value.replace(/[^\d.-]/g, "");

      // Handle decimal point - only allow one
      const parts = filtered.split(".");
      if (parts.length > 2) {
        filtered = parts[0] + "." + parts.slice(1).join("");
      }

      // If num_decimals is 0, don't allow decimal point
      if (num_decimals === 0 && filtered.includes(".")) {
        filtered = filtered.replace(".", "");
      }

      // Limit decimal places
      if (num_decimals !== undefined && num_decimals > 0) {
        const parts = filtered.split(".");
        if (parts.length === 2 && parts[1].length > num_decimals) {
          filtered = parts[0] + "." + parts[1].substring(0, num_decimals);
        }
      }

      return filtered;
    }

    case "alpha": {
      // Allow only letters and spaces
      return value.replace(/[^A-Za-z\s]/g, "");
    }

    case "email":
    case "mixed":
    default: {
      // Allow all characters for email and mixed
      return value;
    }
  }
}

export const HazoUiFlexInput = React.forwardRef<
  HTMLInputElement,
  HazoUiFlexInputProps
>(
  (
    {
      className,
      input_type = "mixed",
      text_len_min,
      text_len_max,
      num_min,
      num_max,
      regex,
      num_decimals,
      format_guide,
      format_guide_info = false,
      value: controlledValue,
      onChange,
      onBlur,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState<string>(
      typeof controlledValue === "string" ? controlledValue : (typeof controlledValue === "number" ? String(controlledValue) : "")
    );
    const [errorMessage, setErrorMessage] = React.useState<string | undefined>();

    // Use controlled value if provided, otherwise use internal state
    const isControlled = controlledValue !== undefined;
    const currentValue = isControlled
      ? (typeof controlledValue === "string" ? controlledValue : String(controlledValue || ""))
      : internalValue;

    // Sync internal state when controlled value changes externally
    React.useEffect(() => {
      if (isControlled) {
        const newValue = typeof controlledValue === "string" ? controlledValue : String(controlledValue || "");
        if (newValue !== internalValue) {
          setInternalValue(newValue);
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [controlledValue, isControlled]);

    /**
     * Handle input change with character filtering
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let newValue = e.target.value;

      // Apply character filtering for numeric and alpha types
      if (input_type === "numeric" || input_type === "alpha") {
        newValue = filterInputValue(newValue, input_type, num_decimals);
      }

      // Update internal state if uncontrolled
      if (!isControlled) {
        setInternalValue(newValue);
      }

      // Clear error on change
      if (errorMessage) {
        setErrorMessage(undefined);
      }

      // Call original onChange if provided
      if (onChange) {
        const syntheticEvent = {
          ...e,
          target: { ...e.target, value: newValue },
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(syntheticEvent);
      }
    };

    /**
     * Handle blur event with validation
     */
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      const validation = validateInput(
        currentValue,
        input_type,
        text_len_min,
        text_len_max,
        num_min,
        num_max,
        regex,
        num_decimals
      );

      if (!validation.isValid) {
        setErrorMessage(validation.errorMessage || format_guide || "Invalid input");
      } else {
        setErrorMessage(undefined);
      }

      // Call original onBlur if provided
      if (onBlur) {
        onBlur(e);
      }
    };

    // Determine input type for HTML input element
    const htmlInputType =
      input_type === "email" ? "email" : input_type === "numeric" ? "text" : "text";

    // Determine if input has error
    const hasError = errorMessage !== undefined;

    return (
      <div className="cls_hazo_ui_flex_input_container w-full">
        <Input
          ref={ref}
          type={htmlInputType}
          value={currentValue}
          onChange={handleChange}
          onBlur={handleBlur}
          className={cn(
            hasError && "border-destructive focus-visible:ring-destructive",
            className
          )}
          {...props}
        />
        {hasError && errorMessage && (
          <p className="cls_error_message mt-1 text-sm text-destructive">
            {errorMessage}
          </p>
        )}
        {format_guide_info && format_guide && (
          <p
            className={cn(
              "cls_format_guide_info mt-1 text-xs italic text-muted-foreground",
              hasError && "mt-0"
            )}
          >
            {format_guide}
          </p>
        )}
      </div>
    );
  }
);

HazoUiFlexInput.displayName = "HazoUiFlexInput";

