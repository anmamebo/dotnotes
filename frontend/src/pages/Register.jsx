import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "../config/axios";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [message, setMessage] = useState("");

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("/auth/register", data);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message);
    }
  };

  return (
    <>
      <h1>Register</h1>
      <form
        className="flex flex-col items-center w-full gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col w-full">
          <label className="text-md">Name</label>
          <input
            type="text"
            className="mt-1 border-b p-2 py-1"
            id="name"
            {...register("name", { required: true })}
          />
          {errors.name && <span>This field is required</span>}
        </div>

        <div className="flex flex-col w-full">
          <label className="text-md">Email</label>
          <input
            type="email"
            className="mt-1 border-b p-2 py-1"
            id="email"
            {...register("email", { required: true })}
          />
          {errors.email && <span>This field is required</span>}
        </div>

        <div className="flex flex-col w-full">
          <label className="text-md">Password</label>
          <input
            type="password"
            className="mt-1 border-b p-2 py-1"
            id="password"
            {...register("password", { required: true })}
          />
          {errors.password && <span>This field is required</span>}
        </div>

        <button type="submit" className="px-4 py-2 border-black border w-1/2">
          Register
        </button>

        {message && <span>{message}</span>}
      </form>
    </>
  );
};

export default Register;
