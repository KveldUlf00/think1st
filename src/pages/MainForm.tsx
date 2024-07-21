import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import axios from "axios";

type Inputs = {
  example: string;
  exampleRequired: string;
};

export default function MainForm() {
  const { enqueueSnackbar } = useSnackbar();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  console.log(watch("example")); // watch input value by passing the name of it

  useEffect(() => {
    const url = "http://localhost:3000/posts";
    axios.get(url).then((res) => {
      console.log("res", res);
      console.log("res.data", res.data);
    });
  }, []);

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <input defaultValue="test" {...register("example")} />

      {/* include validation with required or other standard HTML validation rules */}
      <input {...register("exampleRequired", { required: true })} />
      {/* errors will return when field validation fails  */}
      {errors.exampleRequired && <span>This field is required</span>}

      <input type="submit" />
    </form>
  );
}
