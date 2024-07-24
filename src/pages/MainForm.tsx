import React, { useMemo, useState } from "react";

import CustomInput from "../components/CustomInput";
import CustomSlider from "../components/CustomSlider";
import CustomUploader from "../components/CustomUploader";
import CustomCalendar from "../components/CustomCalendar";

type ErrorObject = {
  [key: string]: string;
};

// {errors.length > 0 && (
//   <ul>
//     {errors.map((error) => (
//       <li
//         key={error}
//         className="bg-red-100 text-red-500 px-4 py-2 rounded"
//       >
//         {error}
//       </li>
//     ))}
//   </ul>
// )}

export default function MainForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(8);
  const [photo, setPhoto] = useState<File | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<ErrorObject[]>([]);

  const resetFields = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setAge(8);
    setPhoto(null);
    setSelectedDate(null);
    setSelectedTime("");
    setIsSubmitting(false);
  };

  const canSubmit = useMemo(() => {
    return (
      firstName !== "" &&
      lastName !== "" &&
      email !== "" &&
      age !== null &&
      photo !== null &&
      selectedDate !== null &&
      selectedTime !== ""
    );
  }, [firstName, lastName, email, age, photo, selectedDate, selectedTime]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    let anyError = false;

    if (firstName === "") {
      setErrors((origin) => [
        ...origin,
        { firstName: "First name is required" },
      ]);
      anyError = true;
    }

    if (lastName === "") {
      setErrors((origin) => [
        ...origin,
        { lastName: "First name is required" },
      ]);
      anyError = true;
    }

    if (email === "") {
      // check if has @
      setErrors((origin) => [
        ...origin,
        { email: "Email address is required" },
      ]);
      anyError = true;
    }

    if (photo === null) {
      setErrors((origin) => [...origin, { photo: "Photo is required" }]);
      anyError = true;
    }

    if (selectedDate === null) {
      setErrors((origin) => [
        ...origin,
        { selectedDate: "Please select date." },
      ]);
      anyError = true;
    }

    if (selectedTime === "") {
      setErrors((origin) => [
        ...origin,
        { selectedDate: "Please select time." },
      ]);
      anyError = true;
    }

    if (anyError) {
      resetFields();
    } else {
      const [hours, minutes] = selectedTime.split(":").map(Number);
      const wholeDate = new Date(
        Date.UTC(
          selectedDate!.getUTCFullYear(),
          selectedDate!.getUTCMonth(),
          selectedDate!.getUTCDate() + 1,
          hours,
          minutes
        )
      );

      const dataToSubmit = {
        firstName,
        lastName,
        email,
        age,
        photo,
        wholeDate,
      };

      console.log("dataToSubmit", dataToSubmit);

      // TODO: submit to server
      // ...
      await new Promise((resolve) => setTimeout(resolve, 1000));
      resetFields();
    }
  };

  return (
    <div className="w-1/4 mx-auto py-12">
      <p className="text-2xl font-medium">Personal info</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-y-2">
        <CustomInput
          label="first name"
          value={firstName}
          onChange={setFirstName}
        />
        <CustomInput
          label="last name"
          value={lastName}
          onChange={setLastName}
        />
        <CustomInput
          label="email"
          value={email}
          onChange={setEmail}
          type="email"
        />
        <CustomSlider
          label="age"
          value={age}
          onChange={setAge}
          min={8}
          max={100}
        />
        <CustomUploader label="photo" photo={photo} onChange={setPhoto} />

        <p className="text-2xl font-medium">Your workout</p>

        <CustomCalendar
          label="Date"
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
        />
        <button
          type="submit"
          disabled={!canSubmit || isSubmitting}
          className="bg-think-purple hover:bg-think-dark-purple text-white disabled:bg-think-gray mt-4 py-2 px-4 rounded font-medium text-lg"
        >
          Send Application
        </button>
      </form>
    </div>
  );
}
