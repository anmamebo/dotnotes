import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "../config/axios";
import AuthContext from "../context/AuthContext";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { login } = useContext(AuthContext);
  const [message, setMessage] = useState("");

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("/auth/login", data);
      login(res.data.token, res.data.user);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message);
    }
  };

  return (
    <>
      <h1>Login</h1>
      <form
        className="flex flex-col items-center w-full gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
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
          Login
        </button>

        {message && <span>{message}</span>}
      </form>
    </>
  );
};

export default Login;
