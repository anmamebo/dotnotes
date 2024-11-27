import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";
import LanguageSwitcher from "../components/LanguageSwitcher";
import axios from "../config/axios";
import AuthContext from "../context/AuthContext";

const Login = () => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { login, token } = useContext(AuthContext);
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

  if (token) {
    return <Navigate to="/notes" replace />;
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="px-8 py-12 w-full sm:max-w-2xl lg:max-w-xl">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-center">
              {t("welcomeMessage")}
            </h1>
            <p className="text-gray-600 text-center">{t("loginMessage")}</p>
          </div>

          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Email Field */}
            <div className="flex flex-col">
              <label className="text-md font-medium">
                {t("form.inputEmail")}
              </label>
              <input
                type="email"
                className="mt-1 border-b border-black p-2 bg-transparent"
                id="email"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {t("form.errors.fieldRequired")}
                </span>
              )}
            </div>

            {/* Password Field */}
            <div className="flex flex-col">
              <label className="text-md font-medium">
                {t("form.inputPassword")}
              </label>
              <input
                type="password"
                className="mt-1 border-b border-black p-2 bg-transparent"
                id="password"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <span className="text-red-500 text-sm">
                  {t("form.errors.fieldRequired")}
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
              {t("login")}
            </button>

            {/* Register Link */}
            <p className="text-center">
              {t("noAccount")}{" "}
              <a href="/register" className="font-medium">
                {t("register")}
              </a>
            </p>
          </form>
        </div>

        <LanguageSwitcher />
      </div>
    </>
  );
};

export default Login;
