type SubmitButtonType = {
  label: string;
  disabled: boolean;
};

export default function SubmitButton({ label, disabled }: SubmitButtonType) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="bg-think-purple hover:bg-think-dark-purple text-white disabled:bg-think-gray mt-4 py-2 px-4 rounded font-medium text-lg"
    >
      {label}
    </button>
  );
}
