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
    } catch (err) {
      setMessage(err.response?.data?.message);

      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="px-8 py-12 w-full sm:max-w-2xl lg:max-w-xl">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-center">
              Welcome to DotNotes
            </h1>
            <p className="text-gray-600 text-center">Log in to your account</p>
          </div>

          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
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
              <span className="text-sm font-medium text-red-500">
                {message}
              </span>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-black text-white border border-black rounded hover:bg-[#F5F5F5] hover:text-black w-full font-medium"
            >
              Log in
            </button>

            {/* Register Link */}
            <p className="text-center">
              Don&apos;t have an account?{" "}
              <a href="/register" className="font-medium">
                Register
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
