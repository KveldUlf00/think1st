import { ChangeEventHandler } from "react";

import ErrorMessage from "./ErrorMessage";
import FieldHeader from "./FieldHeader";

type CustomInputType = {
  label: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement> | undefined;
  type?: string;
  errors?: string | null;
};

export default function CustomInput({
  label,
  value,
  onChange,
  type,
  errors,
}: CustomInputType) {
  const baseClassName =
    "px-4 py-2 outline-none rounded-lg border border-1 border-solid focus-visible:bg-think-light-gray" as const;
  const activeClassName =
    "border-think-gray focus-visible:border-2 focus-visible:border-think-purple" as const;
  const errorClassName =
    "border-2 border-think-red !bg-think-light-red focus-visible:border-think-red" as const;

  const inputClassName = `${baseClassName} ${errors ? errorClassName : activeClassName}`;

  return (
    <div className="flex flex-col my-1">
      <FieldHeader label={label} />
      <input
        value={value}
        onChange={onChange}
        type={type || "text"}
        required
        className={inputClassName}
      />
      {errors && <ErrorMessage label={errors} />}
    </div>
  );
}
