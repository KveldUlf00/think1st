export const combineDateTime = (
  selectedTime: string,
  selectedDate: Date | null
): Date => {
  const [hours, minutes] = selectedTime.split(":").map(Number);
  const wholeDate = new Date(
    selectedDate!.getUTCFullYear(),
    selectedDate!.getUTCMonth(),
    selectedDate!.getUTCDate() + 1,
    hours,
    minutes
  );
  return wholeDate;
};
