import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import axios from "../config/axios";
import AuthContext from "../context/AuthContext";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const { token } = useContext(AuthContext);

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("/auth/register", data);
      setMessage(res.data.message);
      setMessageType("success");
      reset();

      setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 3000);
    } catch (err) {
      setMessage(err.response?.data?.message);
      setMessageType("error");

      setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 3000);
    }
  };

  if (token) {
    return <Navigate to="/notes" replace />;
  }

  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="px-8 py-12 w-full sm:max-w-2xl lg:max-w-xl">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-center">
              Welcome to DotNotes
            </h1>
            <p className="text-gray-600 text-center">
              Register for a new account
            </p>
          </div>

          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Name Field */}
            <div className="flex flex-col">
              <label className="text-md font-medium">Name</label>
              <input
                type="text"
                className="mt-1 border-b border-black p-2 bg-transparent"
                id="name"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <span className="text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </div>

            {/* Email Field */}
            <div className="flex flex-col">
              <label className="text-md font-medium">Email</label>
              <input
                type="email"
                className="mt-1 border-b border-black p-2 bg-transparent"
                id="email"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </div>

            {/* Password Field */}
            <div className="flex flex-col">
              <label className="text-md font-medium">Password</label>
              <input
                type="password"
                className="mt-1 border-b border-black p-2 bg-transparent"
                id="password"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <span className="text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </div>

            {/* Feedback Message */}
            {message && (
              <span
                className={`text-sm font-medium ${
                  messageType === "success" ? "text-green-500" : "text-red-500"
                }`}
              >
                {message}
              </span>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-black text-white border border-black rounded hover:bg-[#F5F5F5] hover:text-black w-full font-medium"
            >
              Register
            </button>

            {/* Login Link */}
            <p className="text-center">
              Already have an account?{" "}
              <a href="/login" className="font-medium">
                Log in
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
