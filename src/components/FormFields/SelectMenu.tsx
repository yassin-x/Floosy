import { IFormField, ValidationErrors } from "@/types/app";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
interface Props extends IFormField {
  error: ValidationErrors;
}
export default function SelectMenu({
  label,
  name,
  placeholder,
  disabled,
  required,
  options,
  error,
}: Props) {
  return (
    <div>
      <Label
        htmlFor={name}
        className="capitalize text-primary-foreground mb-2 gap-1"
      >
        {label}
        <sup className="text-destructive text-sm mx-0">{required && "*"}</sup>
      </Label>
      <Select disabled={disabled} required={required} name={name} dir={"rtl"}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{label}</SelectLabel>
            {options?.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
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
}
