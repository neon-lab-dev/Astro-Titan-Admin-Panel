import { forwardRef } from "react";
import type { FieldError } from "react-hook-form";

interface TextareaProps {
  label: string;
  name: string;
  placeholder?: string;
  rows?: number;
  error?: FieldError;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isRequired?: boolean;
  isDisabled?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      name,
      placeholder = "",
      rows = 4,
      error,
      isRequired = true,
      isDisabled = false,
      ...rest
    },
    ref
  ) => {
    return (
      <div className="flex flex-col gap-2 font-Inter">
        <label htmlFor={name} className="text-neutral-65">
          {label}
          <span className="text-red-600">
            {" "}
            {isRequired && <span className="text-red-600"> *</span>}
          </span>
        </label>
        <textarea
          id={name}
          name={name}
          required={isRequired}
          placeholder={placeholder}
          rows={rows}
          ref={ref}
          disabled={isDisabled}
          className={`px-[18px] py-[14px] rounded-lg border focus:outline-none focus:border-primary-500 transition duration-300 ${isDisabled ? "bg-neutral-200/50" : "bg-neutral-50"} ${
            error ? "border-red-500" : "border-neutral-75"
          }`}
          {...rest}
        ></textarea>
        {error && <span className="text-red-500 text-sm">{error.message}</span>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
