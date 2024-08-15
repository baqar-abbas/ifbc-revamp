import axios from "axios";
import React, { useRef, useState } from "react";
import { useContext } from "react";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import PageTransition from "src/Animations/PageTransition";
import { setToken, setUserDetails } from "src/Redux/listingReducer";
import { sanitizeInput, validateEmail } from "src/Utils/SanitizeInput";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formFields, setFormFields] = useState({});
  const [successMsg, setSuccessMsg] = useState(null);
  const [buttonText, setButtonText] = useState("Login");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const ref = useRef();
  const history = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const [error, setError] = useState({});

  const getUserDetails = async (token) => {
    const url = "https://backend.ifbc.co/api/users/userdata";

    try {
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Handle successful response
      if (response.status === 200) {
        const someUserDetails = response.data;
        return {
          docId: someUserDetails.docId,
          firstName: someUserDetails.firstName,
          lastName: someUserDetails.lastName,
          email: someUserDetails.email,
          profileImage: someUserDetails.profileImage,
          userType: someUserDetails.userType,
        };
      } else {
        console.error("No user details found");
      }
    } catch (error) {
      // Handle error
      console.error("Error fetching data:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const inputValue = sanitizeInput(value);
    const newName = name.toLowerCase();

    setFormFields((prevFields) => ({
      ...prevFields,
      [newName]: inputValue,
    }));
    setError((prevErrors) => ({
      ...prevErrors,
      [newName]: "",
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const reqFields = ["email", "password"];
    let allFieldsValid = true;
    let formErrors = {};

    reqFields.forEach((field) => {
      const newKey = field.toLowerCase();
      const value = formFields[newKey];

      if (!value) {
        formErrors[newKey] = "This field is required";
        allFieldsValid = false;
      } else {
        // Field-specific validations
        if (newKey === "email" && !validateEmail(value)) {
          formErrors[newKey] = "Invalid Email!";
          allFieldsValid = false;
        }
      }
    });
    setError(formErrors);

    try {
      const baseUrl = `https://backend.ifbc.co/api/login`;
      if (allFieldsValid) {
        const requestData = {
          email: formFields.email,
          password: formFields.password,
        };

        const response = await axios.post(baseUrl, requestData, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          const userToken = response.data.token;
          const someUserDetails = await getUserDetails(userToken);
          dispatch(setUserDetails(someUserDetails));
          setUserDetails(someUserDetails);
          setSuccessMsg("Login Successfull");
          setLoading(false);
          setButtonText("Redirecting...");
          localStorage.setItem("token", userToken);
          dispatch(setToken(true));
          window.location.href = "/";
        }
      } else {
        setError((prev) => ({
          ...prev,
          credentials: "Please fill in all the required fields",
        }));
        setLoading(false);
      }
    } catch (error) {
      // HELLO
      if (error?.response?.status === 401) {
        setError((prev) => {
          return {
            ...prev,
            credentials: "Username or password incorrect",
          };
        });

        setLoading(false);
        return;
      }
      setError((prev) => {
        return {
          ...prev,
          credentials: "Server Error",
        };
      });

      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <Helmet>
        <title>Login | International Franchise Business Consultant</title>
        <meta
          name="description"
          content="Login to your International Franchise Business Consultants account. Access personalized services and manage your franchise opportunities."
        />
      </Helmet>

      <div className="w-full h-full grid place-items-center py-28">
        <div className="w-[350px] md:w-[450px] flex justify-center flex-col items-center ">
          <form
            className="bg-white w-full shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded px-4 md:px-8 pt-6 pb-8 mb-4"
            ref={ref}
            onSubmit={handleSubmit}
          >
            {error.credentials && (
              <p className="text-red-500 font-bold text-sm mb-4 border border-red-500 p-2 ">
                {error.credentials}!
              </p>
            )}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Email
              </label>
              <input
                className={`shadow appearance-none ${
                  error.email ? "border-red-500" : ""
                } border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                name="email"
                id="email"
                type="email"
                onChange={handleInputChange}
                placeholder="Enter Email"
              />
              {error.email && error.email.includes("invalid") && (
                <p className="text-red-500 text-xs italic mt-2">
                  {error.email}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <input
                  className={`shadow appearance-none border ${
                    error.password ? "border-red-500" : ""
                  } rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  onChange={handleInputChange}
                  placeholder="******************"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-700"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {error.password && error.password.includes("invalid") && (
                <p className="text-red-500 text-xs italic mt-2">
                  {error.password}
                </p>
              )}
            </div>
            {successMsg && (
              <p className="text-green-800 font-bold text-sm mb-4 border border-green-800 p-2">
                {successMsg}!
              </p>
            )}
            <div className="flex items-center justify-between gap-2">
              <button
                className="bg-blue-500 hover:bg-custom-dark-blue text-white font-bold p-2 uppercase text-center rounded w-full text-xs md:text-sm focus:outline-none focus:shadow-outline"
                type="submit"
              >
                {loading ? "Loading.." : buttonText}
              </button>
              <NavLink
                className="inline-block bg-custom-heading-color text-white hover:bg- focus:outline-none focus:shadow-outline font-semibold text-xs md:text-sm p-2 rounded w-full text-center uppercase"
                to="/forgot-password"
              >
                Forgot Password?
              </NavLink>
            </div>
            <NavLink
              to="/registration"
              className="flex justify-center mt-4 bg-custom-grey hover:bg-gray-950 text-white font-bold p-2 uppercase text-center rounded w-full text-xs md:text-sm focus:outline-none focus:shadow-outline"
            >
              Don't have an account? Create now!
            </NavLink>
          </form>
          {/* footer */}
          <p className="text-center text-gray-500 text-xs">
            ©2024 IFBC. All rights reserved.
          </p>
        </div>
      </div>
    </PageTransition>
  );
};

export default Login;
