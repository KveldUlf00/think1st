import { ErrorIcon } from "../assets/shapes";

type ErrorMessageType = {
  label: string;
};

export default function ErrorMessage({ label }: ErrorMessageType) {
  return (
    <div className="flex items-center mt-1">
      <ErrorIcon />
      <span className="text-think-dark ml-2 max-w-52 text-sm">{label}</span>
    </div>
  );
}
