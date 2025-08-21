import { IFormField, ValidationErrors } from "@/types/app";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

interface Props extends IFormField {
  error: ValidationErrors;
}

const TextareaField = ({
  label,
  name,
  placeholder,
  disabled,
  autoFocus,
  error,
  defaultValue,
  readOnly,
  required,
}: Props) => {
  return (
    <div className="space-y-2">
      <Label
        htmlFor={name}
        className="capitalize text-primary-foreground mb-2 gap-1"
      >
        {label}
        <sup className="text-destructive text-sm mx-0">{required && "*"}</sup>
      </Label>
      <Textarea
        placeholder={placeholder}
        disabled={disabled}
        autoFocus={autoFocus}
        name={name}
        id={name}
        defaultValue={defaultValue}
        readOnly={readOnly}
        className="focus-visible:border-border focus-visible:ring-0"
      />
      {error && error[name] && (
        <p
          className={`text-muted-foreground mt-2 text-sm font-medium ${
            error[name] ? "text-destructive" : ""
          }`}
        >
          {error[name]}
        </p>
      )}
    </div>
  );
};

export default TextareaField;
