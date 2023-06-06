import React, { useEffect } from "react";
import ApiCalls from "../utils/ApiCalls";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  mobileNumber: Yup.string().required("Mobile number is required"),
  password: Yup.string().required("Password is required"),
  designation: Yup.string().required("Designation is required"),
});

const Register = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    const { success, message, data } = await ApiCalls.Register(values);
    console.log(data);
    if (success) {
      return Swal.fire({
        text: "You have successfully signed up!",
        showConfirmButton: false,
        timer: 2000,
        background: "#61FF33",
      }).then(() => {
        setSubmitting(false);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
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
          Join us Now
        </div>
        <div className="mt-4 self-center text-xl sm:text-sm text-gray-800">
          Enter your credentials to get access to your account
        </div>

        <div className="mt-10">
          <Formik
            initialValues={{
              username: "",
              email: "",
              mobileNumber: "",
              password: "",
              designation:"",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <div className="flex flex-col mb-5">
                <label
                  htmlFor="name"
                  className="mb-1 text-xs tracking-wide text-gray-600"
                >
                  Name:
                </label>
                <div className="relative">
                  <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400"></div>

                  <Field
                    id="username"
                    type="text"
                    name="username"
                    className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                    placeholder="Enter your name"
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-red-500 mt-1"
                  />
                </div>
              </div>

              <div className="flex flex-col mb-5">
                <label
                  htmlFor="email"
                  className="mb-1 text-xs tracking-wide text-gray-600"
                >
                  Enter Email:
                </label>
                <div className="relative">
                  <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400"></div>

                  <Field
                    id="email"
                    type="text"
                    name="email"
                    className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                    placeholder="Enter your email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 mt-1"
                  />
                </div>
              </div>
              <div className="flex flex-col mb-5">
                <label
                  htmlFor="name"
                  className="mb-1 text-xs tracking-wide text-gray-600"
                >
                  Designation:
                </label>
                <div className="relative">
                  <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400"></div>

                  <Field
                    id="designation"
                    type="text"
                    name="designation"
                    className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                    placeholder="Enter your designation"
                  />
                  <ErrorMessage
                    name="designation"
                    component="div"
                    className="text-red-500 mt-1"
                  />
                </div>
              </div>
              <div className="flex flex-col mb-5">
                <label
                  htmlFor="name"
                  className="mb-1 text-xs tracking-wide text-gray-600"
                >
                  Mobile Number:
                </label>
                <div className="relative">
                  <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400"></div>

                  <Field
                    id="mobileNumber"
                    type="text"
                    name="mobileNumber"
                    className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                    placeholder="Enter your number"
                  />
                  <ErrorMessage
                    name="mobileNumber"
                    component="div"
                    className="text-red-500 mt-1"
                  />
                </div>
              </div>
              <div className="flex flex-col mb-5">
                <label
                  htmlFor="name"
                  className="mb-1 text-xs tracking-wide text-gray-600"
                >
                  Password:
                </label>
                <div className="relative">
                  <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400"></div>

                  <Field
                  type="password"
                  name="password"
                  className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                  placeholder="Enter your password"
                />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 mt-1"
                  />
                </div>
              </div>

              <div className="flex w-full">
                <button
                  type="submit"
                  className="flex mt-2 items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-500 hover:bg-blue-600 rounded-2xl py-2 w-full transition duration-150 ease-in"
                >
                  <span className="mr-2 uppercase">Sign Up</span>
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Register;
