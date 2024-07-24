type TimeParcelType = {
  time: string;
  selectedTime: string;
  onClick: React.MouseEventHandler<HTMLDivElement> | undefined;
};

export default function TimeParcel({
  time,
  selectedTime,
  onClick,
}: TimeParcelType) {
  return (
    <div
      className={`w-think-parcel-w h-think-parcel-h mb-2 flex justify-center items-center rounded-lg border-solid border border-think-gray bg-white cursor-pointer ${selectedTime === time && "outline outline-2 outline-think-purple"}`}
      key={`key-${time}`}
      onClick={onClick}
    >
      {time}
    </div>
  );
}
