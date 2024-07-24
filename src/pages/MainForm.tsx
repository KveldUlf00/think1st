import React, { useEffect, useMemo, useState } from "react";
import { useSnackbar } from "notistack";

import CustomInput from "../components/CustomInput";
import CustomSlider from "../components/CustomSlider";
import CustomUploader from "../components/CustomUploader";
import CustomCalendar from "../components/CustomCalendar";
import SubmitButton from "../components/SubmitButton";

import { isValidEmail } from "../utils/emailValidation";
import type { ErrorObject } from "../api/types";

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
  const [errors, setErrors] = useState<ErrorObject>({});

  const { enqueueSnackbar } = useSnackbar();

  const noErrors = useMemo(() => {
    if (Object.keys(errors).length === 0) {
      return true;
    }
    return Object.values(errors).every((value) => value === null);
  }, [errors]);

  const validateFields = (
    field: keyof ErrorObject,
    value: string | File | Date | null
  ) => {
    const newErrors: ErrorObject = { ...errors };

    switch (field) {
      case "firstName":
        newErrors.firstName = value === "" ? "First name is required" : null;
        break;
      case "lastName":
        newErrors.lastName = value === "" ? "Last name is required" : null;
        break;
      case "email":
        if (value === "") {
          newErrors.email = "Email address is required";
        } else if (typeof value === "string" && !isValidEmail(value)) {
          newErrors.email =
            "Please use correct formatting. Example: address@email.com";
        } else {
          newErrors.email = null;
        }
        break;
      case "photo":
        newErrors.photo = value === null ? "Photo is required" : null;
        break;
      case "selectedDate":
        newErrors.selectedDate = value === null ? "Please select a date" : null;
        break;
      case "selectedTime":
        newErrors.selectedTime = value === "" ? "Please select a time" : null;
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

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

  const inputsAreNotEmpty = useMemo(() => {
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

    const newErrors: ErrorObject = {};

    if (firstName === "") newErrors.firstName = "First name is required";
    if (lastName === "") newErrors.lastName = "Last name is required";
    if (email === "") newErrors.email = "Email address is required";
    else if (!isValidEmail(email))
      newErrors.email =
        "Please use correct formatting. Example: address@email.com";
    if (photo === null) newErrors.photo = "Photo is required";
    if (selectedDate === null) newErrors.selectedDate = "Please select a date";
    if (selectedTime === "") newErrors.selectedTime = "Please select a time";

    if (Object.keys(newErrors).length > 0) {
      enqueueSnackbar("Form is invalid, correct errors.", {
        variant: "error",
      });
      setIsSubmitting(false);
      return;
    }

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
  };

  return (
    <div className="w-1/4 mx-auto py-12">
      <p className="text-2xl font-medium">Personal info</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-y-2">
        <CustomInput
          label="first name"
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
            validateFields("firstName", e.target.value);
          }}
          errors={errors.firstName}
        />
        <CustomInput
          label="last name"
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
            validateFields("lastName", e.target.value);
          }}
          errors={errors.lastName}
        />
        <CustomInput
          label="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            validateFields("email", e.target.value);
          }}
          errors={errors.email}
        />
        <CustomSlider
          label="age"
          value={age}
          onChange={setAge}
          min={8}
          max={100}
        />
        <CustomUploader
          label="photo"
          photo={photo}
          onChange={(file) => {
            setPhoto(file);
            validateFields("photo", file);
          }}
          errors={errors.photo}
        />

        <p className="text-2xl font-medium">Your workout</p>

        <CustomCalendar
          label="Date"
          selectedDate={selectedDate}
          setSelectedDate={(date) => {
            setSelectedDate(date);
          }}
          selectedTime={selectedTime}
          setSelectedTime={(time) => {
            setSelectedTime(time);
            validateFields("selectedTime", time);
          }}
          errors={errors.selectedTime}
        />
        <SubmitButton
          label="Send Application"
          disabled={!inputsAreNotEmpty || isSubmitting || !noErrors}
        />
      </form>
    </div>
  );
}
