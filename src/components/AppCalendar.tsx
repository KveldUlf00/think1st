import React, { useEffect, useState, useMemo } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addMonths,
  subMonths,
  eachDayOfInterval,
  isSunday,
  isToday,
  isSameDay,
} from "date-fns";
import { useSnackbar } from "notistack";

import ErrorMessage from "./ErrorMessage";
import FieldHeader from "./FieldHeader";
import TimeParcel from "./TimeParcel";
import { getHolidays } from "../api/userService";
import { type Holiday, DateType } from "../api/types";
import {
  CircleIcon,
  InfoIcon,
  LeftArrowIcon,
  RightArrowIcon,
} from "../assets/shapes";

type AppCalendarType = {
  label: string;
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
  selectedTime: string;
  setSelectedTime: (time: string) => void;
  errors?: string | null;
};

export default function AppCalendar({
  label,
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  errors,
}: AppCalendarType) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [loadingHolidays, setLoadingHolidays] = useState(true);
  const [chosenObservance, setChosenObservance] = useState<Holiday | null>(
    null
  );

  const { enqueueSnackbar } = useSnackbar();

  const possibleTimes = ["12:00", "14:00", "16:30", "18:30", "20:00"] as const;

  const monthStart = useMemo(() => startOfMonth(currentDate), [currentDate]);
  const monthEnd = useMemo(() => endOfMonth(currentDate), [currentDate]);

  const startCurrentRange = useMemo(
    () => startOfWeek(monthStart, { weekStartsOn: 1 }),
    [monthStart]
  );
  const endCurrentRange = useMemo(
    () => endOfWeek(monthEnd, { weekStartsOn: 1 }),
    [monthEnd]
  );

  const dates = useMemo(
    () => eachDayOfInterval({ start: startCurrentRange, end: endCurrentRange }),
    [startCurrentRange, endCurrentRange]
  );

  const nationalHolidaysAsDates = useMemo(
    () =>
      holidays
        .filter((day) => day.type === DateType.NationalHoliday)
        .map((day) => day.date),
    [holidays]
  );

  const observancesAsDates = useMemo(
    () =>
      holidays
        .filter((day) => day.type === DateType.Observance)
        .map((day) => day.date),
    [holidays]
  );

  const handleMonthChange = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    direction: "prev" | "next"
  ) => {
    e.preventDefault();
    setCurrentDate((prevDate) => {
      const newDate =
        direction === "prev" ? subMonths(prevDate, 1) : addMonths(prevDate, 1);
      return newDate;
    });
  };

  const getDateConditions = (date: Date) => {
    const isOutsideCurrentMonth = date < monthStart || date > monthEnd;

    const isSundayDay = isSunday(date);

    const isNationalHoliday = nationalHolidaysAsDates.includes(
      format(date, "yyyy-MM-dd")
    );

    const isObservance = observancesAsDates.includes(
      format(date, "yyyy-MM-dd")
    );

    const disableOnClick =
      isSundayDay || isNationalHoliday || isOutsideCurrentMonth;

    const isSelected = selectedDate && isSameDay(date, selectedDate);

    return { isOutsideCurrentMonth, isObservance, disableOnClick, isSelected };
  };

  const handleDateClick = (date: Date) => {
    setSelectedTime("");
    setSelectedDate(date);
    if (observancesAsDates.includes(format(date, "yyyy-MM-dd"))) {
      const dayAsObservance = holidays.find(
        (holiday) => holiday.date === format(date, "yyyy-MM-dd")
      );
      setChosenObservance(
        dayAsObservance !== undefined ? dayAsObservance : null
      );
    } else {
      setChosenObservance(null);
    }
  };

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const data = await getHolidays("PL", 2024);
        setHolidays(data);
      } catch (error) {
        enqueueSnackbar("Failed to fetch holidays.", {
          variant: "error",
        });
      } finally {
        setLoadingHolidays(false);
      }
    };

    fetchHolidays();
  }, []);

  return (
    <div className="flex flex-col my-1">
      <div className="flex-col sm:flex-row flex">
        <div>
          <FieldHeader label={label} />
          <div className="p-4 w-full sm:w-think-calendar-w min-h-think-calendar-h bg-white relative rounded-lg border-solid border border-think-gray">
            <div className="flex items-center justify-between mb-2">
              <button
                onClick={(e) => handleMonthChange(e, "prev")}
                className="p-1 hover:animate-pulse"
              >
                <LeftArrowIcon />
              </button>
              <span className="text-base font-medium">
                {format(currentDate, "MMMM yyyy")}
              </span>
              <button
                onClick={(e) => handleMonthChange(e, "next")}
                className="p-1 hover:animate-pulse"
              >
                <RightArrowIcon />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center">
              {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => (
                <div key={day} className="p-1 text-sm font-medium">
                  {day}
                </div>
              ))}
              {dates.map((date: Date) => {
                const {
                  isOutsideCurrentMonth,
                  isObservance,
                  disableOnClick,
                  isSelected,
                } = getDateConditions(date);

                return (
                  <div
                    key={date.toString()}
                    onClick={() => !disableOnClick && handleDateClick(date)}
                    className={`w-8 h-8 flex items-center justify-center ${!disableOnClick && "cursor-pointer"} rounded-full ${isOutsideCurrentMonth && "opacity-0"} ${isObservance && "text-gray-400"} ${disableOnClick ? "cursor-default text-gray-400" : "text-black"} ${isSelected && "bg-purple-500 !text-white"} ${isToday(date) && "border border-think-purple"}`}
                  >
                    <span className="flex items-center justify-center">
                      {date.getDate()}
                    </span>
                  </div>
                );
              })}
            </div>
            {loadingHolidays && (
              <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
                <div className="flex justify-center align-center">
                  <CircleIcon />
                  <p className="ml-2 text-lg font-medium">
                    Processing holiday data...
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        {selectedDate !== null && chosenObservance === null && (
          <div className="sm:ml-6 mt-4 sm:mt-0">
            <FieldHeader label="time" />
            <div className="flex flex-wrap gap-x-3 sm:block">
              {possibleTimes.map((time) => (
                <TimeParcel
                  key={`key-${time}`}
                  time={time}
                  selectedTime={selectedTime}
                  onClick={() => setSelectedTime(time)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      {chosenObservance !== null && (
        <div className="mt-2 flex items-center">
          <InfoIcon />
          <span className="pl-2">It is {chosenObservance.name}.</span>
        </div>
      )}
      {chosenObservance === null && errors && <ErrorMessage label={errors} />}
    </div>
  );
}
