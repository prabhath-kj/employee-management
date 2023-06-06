import React, { useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import ApiCalls from "../utils/ApiCalls";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  // Initial form values
  const initialValues = {
    email: "",
    password: "",
  };

  // Form submission handler
  const handleSubmit = async (values, { setSubmitting }) => {
    const { success, message, data } = await ApiCalls.Login(values);
    if (success) {
      return Swal.fire({
        text: message,
        showConfirmButton: false,
        timer: 2000,
        background: "#61FF33",
      }).then(() => {
        localStorage.setItem("token", data);
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
        setSubmitting(false);
      });
    }
    Swal.fire({
      text: message,
      showConfirmButton: false,
      timer: 2000,
      background: "#FFC300 ",
    });
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-3xl w-50 max-w-md">
        <div className="font-medium self-center text-xl sm:text-3xl text-gray-800">
          Login
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="mt-10">
              <div className="flex flex-col mb-5">
                <label
                  htmlFor="email"
                  className="mb-1 text-xs  sm:text-sm tracking-wide text-gray-600"
                >
                  Email Address:
                </label>
                <Field
                  type="email"
                  name="email"
                  className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                  placeholder="Enter your email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div className="flex flex-col mb-6">
                <label
                  htmlFor="password"
                  className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                >
                  Password:
                </label>
                <Field
                  type="password"
                  name="password"
                  className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                  placeholder="Enter your password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div className="flex w-full">
                <button
                  type="submit"
                  className="flex mt-2 items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-500 hover:bg-blue-600 rounded-2xl py-2 w-full transition duration-150 ease-in"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Logging in..." : "Login"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <Link to="/signup" className="text-xs  sm:text-sm tracking-wide text-gray-600 text-right pt-4">
          {" "}
          <span>Register</span>
        </Link>
      </div>
    </div>
  );
};

export default Login;
