import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  mobileNumber: Yup.string().required("Mobile number is required"),
  password: Yup.string().required("Password is required"),
  designation: Yup.string().required("Designation is required"),
});

const Modal = ({ onClose }) => {
  const handleSubmit = async (values, { setSubmitting }) => {
    // Handle form submission
    console.log(values);
    setSubmitting(false);
    onClose(); // Close the modal after form submission
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-3xl w-50 max-w-md">
        <div className="font-medium self-center text-xl sm:text-3xl text-gray-800">
          Edit User Profile
        </div>

        <div className="mt-10">
          <Formik
            initialValues={{
              username: "",
              email: "",
              mobileNumber: "",
              password: "",
              designation: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <div className="flex flex-col mb-5">
                <label
                  htmlFor="username"
                  className="mb-1 text-xs tracking-wide text-gray-600"
                >
                  Name:
                </label>
                <Field
                  id="username"
                  type="text"
                  name="username"
                  className="text-sm placeholder-gray-500 pl-4 rounded-2xl border border-gray-400 py-2 focus:outline-none focus:border-blue-400"
                  placeholder="Enter your name"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-red-500 mt-1"
                />
              </div>

              <div className="flex flex-col mb-5">
                <label
                  htmlFor="email"
                  className="mb-1 text-xs tracking-wide text-gray-600"
                >
                  Email:
                </label>
                <Field
                  id="email"
                  type="text"
                  name="email"
                  className="text-sm placeholder-gray-500 pl-4 rounded-2xl border border-gray-400 py-2 focus:outline-none focus:border-blue-400"
                  placeholder="Enter your email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 mt-1"
                />
              </div>

              <div className="flex flex-col mb-5">
                <label
                  htmlFor="mobileNumber"
                  className="mb-1 text-xs tracking-wide text-gray-600"
                >
                  Mobile Number:
                </label>
                <Field
                  id="mobileNumber"
                  type="text"
                  name="mobileNumber"
                  className="text-sm placeholder-gray-500 pl-4 rounded-2xl border border-gray-400 py-2 focus:outline-none focus:border-blue-400"
                  placeholder="Enter your number"
                />
                <ErrorMessage
                  name="mobileNumber"
                  component="div"
                  className="text-red-500 mt-1"
                />
              </div>

              <div className="flex flex-col mb-5">
                <label
                  htmlFor="designation"
                  className="mb-1 text-xs tracking-wide text-gray-600"
                >
                  Designation:
                </label>
                <Field
                  id="designation"
                  type="text"
                  name="designation"
                  className="text-sm placeholder-gray-500 pl-4 rounded-2xl border border-gray-400 py-2 focus:outline-none focus:border-blue-400"
                  placeholder="Enter your designation"
                />
                <ErrorMessage
                  name="designation"
                  component="div"
                  className="text-red-500 mt-1"
                />
              </div>

              <div className="flex flex-col mb-5">
                <label
                  htmlFor="password"
                  className="mb-1 text-xs tracking-wide text-gray-600"
                >
                  Password:
                </label>
                <Field
                  id="password"
                  type="password"
                  name="password"
                  className="text-sm placeholder-gray-500 pl-4 rounded-2xl border border-gray-400 py-2 focus:outline-none focus:border-blue-400"
                  placeholder="Enter your password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 mt-1"
                />
              </div>

              <div className="flex w-full">
                <button
                  type="submit"
                  className="flex mt-2 items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-500 hover:bg-blue-600 rounded-2xl py-2 w-full transition duration-150 ease-in"
                >
                  <span className="mr-2 uppercase">Save</span>
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Modal;
