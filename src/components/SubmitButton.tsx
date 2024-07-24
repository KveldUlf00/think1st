type SubmitButtonType = {
  label: string;
  disabled: boolean;
};

export default function SubmitButton({ label, disabled }: SubmitButtonType) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="bg-think-purple text-white mt-8 py-2 px-4 rounded font-medium text-lg hover:bg-think-dark-purple disabled:bg-think-gray"
    >
      {label}
    </button>
  );
}
