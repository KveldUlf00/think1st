import React, { useState } from "react";

import CustomInput from "../components/CustomInput";
import CustomSlider from "../components/CustomSlider";
import { useSnackbar } from "notistack";
import axios from "axios";

// useEffect(() => {
//   const url = "http://localhost:3000/posts";
//   axios.get(url).then((res) => {
//     console.log("res", res);
//     console.log("res.data", res.data);
//   });
// }, []);

export default function MainForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(8);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // if (password !== confirmPassword) {
    //   setErrors(["Password and confirm password must match"]);
    //   setIsSubmitting(false);
    //   return;
    // }

    // TODO: submit to server
    // ...
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setFirstName("");
    setLastName("");
    setEmail("");
    setAge(8);
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-md m-auto">
      <p className="text-2xl font-medium">Personal info</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-y-2">
        {errors.length > 0 && (
          <ul>
            {errors.map((error) => (
              <li
                key={error}
                className="bg-red-100 text-red-500 px-4 py-2 rounded"
              >
                {error}
              </li>
            ))}
          </ul>
        )}
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
        <span>sss</span>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-think-purple text-white disabled:bg-gray-500 py-2 rounded"
        >
          Send Application
        </button>
      </form>
    </div>
  );
}
