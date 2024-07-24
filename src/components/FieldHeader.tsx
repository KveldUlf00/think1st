type FieldHeaderType = {
  label: string;
};

export default function FieldHeader({ label }: FieldHeaderType) {
  return <span className="capitalize leading-5 pb-1">{label}</span>;
}
