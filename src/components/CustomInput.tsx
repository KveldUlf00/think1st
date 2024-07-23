type CustomInputType = {
  label: string;
  value: string;
  onChange: (value: React.SetStateAction<string>) => void;
  type?: string;
};

export default function CustomInput({
  label,
  value,
  onChange,
  type,
}: CustomInputType) {
  const className =
    "px-4 py-2 rounded-lg border-solid border border-think-gray focus-visible:outline-2 focus-visible:outline-think-purple focus-visible:bg-think-light-gray" as const;

  return (
    <div className="flex flex-col my-1">
      <span className="capitalize pb-1">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type={type || "text"}
        required
        className={className}
      />
    </div>
  );
}
