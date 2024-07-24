import React, { useMemo, useState } from "react";
import { useSnackbar } from "notistack";

import AppInput from "../components/AppInput";
import AppSlider from "../components/AppSlider";
import AppUploader from "../components/AppUploader";
import AppCalendar from "../components/AppCalendar";
import SubmitButton from "../components/SubmitButton";

import { postFormData } from "../api/userService";
import { isValidEmail } from "../utils/emailValidation";
import { combineDateTime } from "../utils/combineDateTime";
import type { ErrorObject } from "../api/types";

// TODO typy do jednego miejsca

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

    const wholeDate = combineDateTime(selectedTime, selectedDate);

    const dataToSubmit = new FormData();
    dataToSubmit.append("firstName", firstName);
    dataToSubmit.append("lastName", lastName);
    dataToSubmit.append("email", email);
    dataToSubmit.append("age", age.toString());
    dataToSubmit.append("date", wholeDate.toISOString());

    if (photo instanceof File) {
      dataToSubmit.append("photo", photo);
    }

    try {
      const result = await postFormData(dataToSubmit);
      enqueueSnackbar("Form data submitted successfully.", {
        variant: "success",
      });
    } catch (error) {
      console.error("Failed to submit form data:", error);
      enqueueSnackbar(
        "Failed to submit form data. Please specify correct url.",
        {
          variant: "error",
        }
      );
    }
    resetFields();
  };

  return (
    <div className="w-think-sm-w sm:w-think-w mx-auto mt-24 mb-32">
      <p className="text-2xl font-medium mb-4">Personal info</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-y-2">
        <AppInput
          label="first name"
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
            validateFields("firstName", e.target.value);
          }}
          errors={errors.firstName}
        />
        <AppInput
          label="last name"
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
            validateFields("lastName", e.target.value);
          }}
          errors={errors.lastName}
        />
        <AppInput
          label="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            validateFields("email", e.target.value);
          }}
          errors={errors.email}
        />
        <AppSlider
          label="age"
          value={age}
          onChange={setAge}
          min={8}
          max={100}
        />
        <AppUploader
          label="photo"
          photo={photo}
          onChange={(file) => {
            setPhoto(file);
            validateFields("photo", file);
          }}
          errors={errors.photo}
        />

        <p className="text-2xl font-medium mt-4">Your workout</p>

        <AppCalendar
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
