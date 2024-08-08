import _ from "lodash";
import React, { useContext, useEffect, useRef, useState } from "react";
import BarLoader from "src/Animations/BarLoader";
import { MyCandContext } from "src/Context/CandidatesDataContext";
import DialogBox from "src/Popups/DialogBox";
import FormatRawDate from "src/Utils/FormatRawDate";
import { convertKeysToLowercase } from "src/Utils/ObjectMethods";
import PageTransition from "src/Animations/PageTransition";
import axios from "axios";

const Profile = () => {
  const [formErrors, setFormErrors] = useState({});
  const { role } = useContext(MyCandContext);
  const token = localStorage.getItem("token") || "";
  const [userDetails, setUserDetails] = useState(null);
  const [formFields, setFormFields] = useState({});
  const [successMsg, setSuccessMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [haveChanges, setHaveChanges] = useState(false);

  const getUserDetails = async () => {
    const url = "https://backend.ifbc.co/api/users/userdata";

    try {
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Handle successful response
      if (response.status === 200) {
        const someUserDetails = response.data;
        setUserDetails(someUserDetails);
      } else {
        console.error("No user details found");
      }
    } catch (error) {
      // Handle error
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (userDetails) {
      const converted = convertKeysToLowercase(userDetails);
      setFormFields(converted);
    }
  }, [userDetails]);

  useEffect(() => {
    getUserDetails();
  }, [token]);

  useEffect(() => {
    if (
      userDetails &&
      !_.isEqual(convertKeysToLowercase(userDetails), formFields)
    ) {
      setHaveChanges(true);
      // proceed with form submission
    } else {
      setHaveChanges(false);
    }
  }, [formFields]);

  const handleSubmit = async () => {
    setLoading(true);
    const reqFields = [
      "firstname",
      "lastname",
      "companyphonenumber",
      "email",
      "city",
      "zippostalcode",
      "companyaddress",
    ];
    let allFieldsValid = true;

    reqFields.forEach((field) => {
      const newKey = field.toLowerCase().split(" ").join("");
      if (!formFields[newKey] || formFields[newKey].trim() === "") {
        setFormErrors((prev) => ({ ...prev, [newKey]: "error" }));

        allFieldsValid = false;
      } else {
        setFormErrors((prev) => ({ ...prev, [newKey]: "" }));
      }
    });

    try {
      if (allFieldsValid) {
        // formdata

        const baseUrl = "https://backend.ifbc.co/api/users";

        // Send the PUT request using Axios
        const response = await axios.put(
          `${baseUrl}/${formFields.docid}`,
          formFields,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 204) {
          setFormErrors({});
          setSuccessMsg("User Information Updated Successfully.");

          setLoading(false);

          setTimeout(() => {
            history("/profile");
          }, 3000);
        } else {
          setFormErrors({ error: response.data });
          setLoading(false);
          window.scrollTo(0, 500);
          // Handle unexpected response
        }
      } else {
        setFormErrors((prev) => ({
          ...prev,
          error: "Please fill in all the required fields",
        }));
        setLoading(false);
        window.scrollTo(0, 500);

        // Handle invalid fields (e.g., show validation errors)
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;
    const newName = name.toLowerCase();

    setFormFields((prevFields) => ({
      ...prevFields,
      [newName]: inputValue,
    }));
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [newName]: "",
    }));
  };

  return (
    <PageTransition>
      {userDetails ? (
        <div
          id="main-profile-section"
          className="w-full md:grid max-md:flex flex-col grid-cols-12 p-5 gap-5 min-h-screen "
        >
          {userDetails ? (
            <>
              <LeftSideBar
                formFields={formFields}
                formErrors={formErrors}
                handleInputChange={handleInputChange}
                userDetails={userDetails}
                successMsg={successMsg}
                handleSubmit={handleSubmit}
                loading={loading}
                role={role}
                haveChanges={haveChanges}
                setFormFields={setFormFields}
              />
              <RightSideBar
                formFields={formFields}
                formErrors={formErrors}
                handleInputChange={handleInputChange}
                userDetails={userDetails}
              />
            </>
          ) : (
            <div className="h-full grid place-items-center col-span-12">
              <BarLoader bgcolor={"blue"} />
            </div>
          )}
        </div>
      ) : (
        <div className="grid place-items-center h-[500px]">
          <BarLoader bgcolor={"blue"} />
        </div>
      )}
    </PageTransition>
  );
};

const LeftSideBar = ({
  formFields,
  formErrors,
  handleInputChange,
  userDetails,
  successMsg,
  handleSubmit,
  loading,
  role,
  haveChanges,
  setFormFields,
}) => {
  const [settingsOn, setSettingsOn] = useState(false);
  const [expOn, setExpOn] = useState(false);
  const [dealOn, setDealOn] = useState(false);
  const fileInputRef = useRef();
  let bgcolor = "rgb(33, 118, 255)";
  let roleName = "Member";
  if (role === "N") {
    bgcolor = "rgb(247, 152, 36)";
    roleName = "Member";
  } else if (role === "A") {
    bgcolor = "rgb(247, 152, 36)";
    roleName = "Admin";
  } else if (role === "C") {
    bgcolor = "rgb(247, 152, 36)";
    roleName = "Consultant/Broker";
  } else if (role === "M") {
    bgcolor = "rgb(247, 152, 36)";
    roleName = "Ambassador";
  } else if (role === "O") {
    bgcolor = "rgb(247, 152, 36)";
    roleName = "Company";
  }

  const [image, setImage] = useState(localStorage.getItem("dpImageUrl") || "");

  // Function to handle image change
  const handleChangeImage = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default");
    formData.append("api_key", "626796268695765");
    try {
      const response = await axios.post(
        "https://api-ap.cloudinary.com/v1_1/dsbplltmw/image/upload/",
        formData,
        {
          headers: {
            // Content-Type header will be automatically set to multipart/form-data
          },
        }
      );
      setImage(response.data.url);
      localStorage.setItem("dpImageUrl", response.data.url);
    } catch (err) {
      console.error(err);
    }
    //setFormFields((prev) => ({ ...prev, profileImage: selectedImage }));
  };
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const initialSrc = userDetails.profileImage
    ? image === ""
      ? `/images/uploads/${userDetails.profileImage}`
      : image
    : image === ""
      ? "/images/avatar-placeholder.png"
      : image;

  const [imgSrc, setImgSrc] = useState(initialSrc);

  useEffect(() => {
    setImgSrc(initialSrc);
  }, [userDetails, image]);

  const handleError = () => {
    setImgSrc("/images/avatar-placeholder.png");
  };
  return (
    <div id="left-sidebar-profile" className=" h-full w-full col-span-3 p-5 ">
      <div
        id="user-container"
        className=" w-full col-span-4 flex flex-col max-md:items-center "
      >
        <div
          id="image-container-profile"
          className="flex items-center gap-5 relative"
        >
          <div>
            <label htmlFor="profile-image-upload">
              <img
                src={imgSrc}
                alt="User Profile"
                className="rounded-full w-44 h-44 object-cover cursor-pointer"
                onError={handleError}
              />
            </label>
            <h1
              style={{ background: bgcolor }}
              className="candidate-label  w-full text-white text-center rounded-full px-3 mt-5"
            >
              {roleName}
            </h1>
          </div>
          <input
            type="file"
            name=""
            ref={fileInputRef}
            onChange={handleChangeImage}
            className="hidden"
          />
          <button
            className="absolute top-0 left-40 bg-custom-dark-blue  rounded-full p-2 flex items-center justify-center"
            onClick={handleButtonClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="rgb(33, 118, 255)"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="white"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
          </button>
        </div>

        <div
          id="user-details-container"
          className="h-full w-full flex flex-col  gap-3 py-5"
        >
          <div className="flex gap-2 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="rgb(33, 118, 255)"
              className="size-6 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>

            <h1 className="icon-text">
              {userDetails.firstName} {userDetails.lastName}
            </h1>
          </div>

          <div className="flex gap-2 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="rgb(33, 118, 255)"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
              />
            </svg>

            <h1 className="icon-text">{userDetails.companyPhoneNumber}</h1>
          </div>

          <div className="flex gap-2 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="rgb(33, 118, 255)"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
              />
            </svg>

            <h1 className="icon-text">{userDetails.email}</h1>
          </div>
          {userDetails?.WebsiteUrl !== "" && (
            <div className="flex gap-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="rgb(33, 118, 255)"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                />
              </svg>

              <h1 className="icon-text">
                <a href={userDetails.websiteUrl}>{userDetails.websiteUrl}</a>
              </h1>
            </div>
          )}

          {userDetails?.LinkedInUrl !== "" && (
            <div className="flex gap-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="rgb(33, 118, 255)"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"
                />
              </svg>
              <h1 className="icon-text">
                <a href={userDetails.linkedInUrl}>{userDetails.linkedinUrl}</a>
              </h1>
            </div>
          )}

          {userDetails?.meetingLink !== "" && (
            <div className="flex gap-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="rgb(33, 118, 255)"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                />
              </svg>

              <h1 className="icon-text">
                {" "}
                <a href={userDetails.meetingLink}>{userDetails.meetingLink}</a>
              </h1>
            </div>
          )}

          <div className="flex gap-2 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="rgb(33, 118, 255)"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
              />
            </svg>

            <h1 className="icon-text">{userDetails.companyAddress}</h1>
          </div>

          <div>
            <div className="flex gap-2 items-center ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="rgb(33, 118, 255)"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>

              <h1 className="icon-text">
                Member Since {FormatRawDate(userDetails)}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="left-siderbar-buttons-container">
        {/* profile settings */}
        <button
          className="candidate-secondary-btn w-full"
          onClick={() => setSettingsOn(true)}
        >
          Edit Settings
        </button>
        {settingsOn && (
          <DialogBox setShow={setSettingsOn} show={settingsOn}>
            <Settings
              handleInputChange={handleInputChange}
              setShow={setSettingsOn}
              userDetails={userDetails}
            />
          </DialogBox>
        )}

        {/* experience settings */}
        <button
          className="candidate-secondary-btn w-full mt-5"
          onClick={() => setExpOn(true)}
        >
          Edit Experience
        </button>
        {expOn && (
          <DialogBox setShow={setExpOn} show={expOn}>
            <Experience
              handleInputChange={handleInputChange}
              setShow={setExpOn}
              userDetails={userDetails}
            />
          </DialogBox>
        )}

        {/* deal and activity settings */}
        <button
          className="candidate-secondary-btn w-full mt-5"
          onClick={() => setDealOn(true)}
        >
          Edit Deal and Activity Settings
        </button>
        {expOn && (
          <DialogBox setShow={setDealOn} show={dealOn}>
            <DealActivity
              handleInputChange={handleInputChange}
              setShow={setDealOn}
              userDetails={userDetails}
            />
          </DialogBox>
        )}
      </div>

      {successMsg && (
        <p className="border-2 border-green-600 text-green-600 p-4 flex justify-between">
          {successMsg}
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
              d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
            />
          </svg>
        </p>
      )}
      {haveChanges && (
        <button className="candidate-btn w-full mt-5" onClick={handleSubmit}>
          {loading ? "Loading..." : "SAVE YOUR PROFILE INFORMATION"}
        </button>
      )}
    </div>
  );
};

const Settings = ({ handleInputChange, setShow, userDetails }) => {
  return (
    <div id="settings" className="w-full col-span-4 p-8 flex flex-col gap-3">
      <button
        className="absolute top-5 right-10"
        onClick={() => setShow(false)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="red"
          className="size-9"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </button>
      <h1 className="text-custom-heading-color font-bold text-2xl">
        Your Settings
      </h1>
      <div id="password">
        <div className="candidate-sub-childs">
          <p className="icon-text">New Password</p>
          <input
            onChange={handleInputChange}
            type="text"
            placeholder="Create New Password"
            name="password"
            className="candidate-input"
            required
          />
        </div>
      </div>

      <div id="confirmpassword">
        <div className="candidate-sub-childs">
          <p className="icon-text">Confirm New Password</p>
          <input
            onChange={handleInputChange}
            type="text"
            placeholder="Confirm New Password"
            name="confirmpassword"
            className="candidate-input"
            required
          />
        </div>
      </div>

      <div>
        <input
          name="territorycheck"
          onChange={handleInputChange}
          id="default-checkbox"
          type="checkbox"
          defaultChecked={userDetails?.territoryCheck}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
        />
        <label htmlFor="default-checkbox" className="font-bold text-sm">
          Receive an email for each Territory Check or Formal Registration that
          is sent. (Default is to get a single email receipt for all TC's or
          FR's that are sent.)
        </label>
      </div>

      <h1 className="text-custom-heading-color font-bold text-2xl">
        System Settings
      </h1>
      <h1 className="font-bold text-sm">Client Info Sheet Settings</h1>

      <div className="flex items-center">
        <input
          name="disablelogo"
          onChange={handleInputChange}
          id="default-checkbox"
          type="checkbox"
          defaultChecked={userDetails?.disableLogo}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
        />
        <label
          htmlFor="default-checkbox"
          className="ms-2 text-sm font-bold text-slate-500"
        >
          Disable logo on client sheet
        </label>
      </div>
      <div className="flex items-center">
        <input
          name="disablecover"
          onChange={handleInputChange}
          id="default-checkbox"
          type="checkbox"
          defaultChecked={userDetails?.disableCover}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
        />
        <label
          htmlFor="default-checkbox"
          className="ms-2 text-sm font-bold text-slate-500 "
        >
          Disable Cover Sheet
        </label>
      </div>
      <div className="flex items-center">
        <input
          name="disableprofile"
          onChange={handleInputChange}
          id="default-checkbox"
          type="checkbox"
          defaultChecked={userDetails?.disableProfile}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
        />
        <label
          htmlFor="default-checkbox"
          className="ms-2 text-sm font-bold text-slate-500 "
        >
          Disable profile image on client sheet
        </label>
      </div>
      <div className="flex items-center">
        <input
          name="disablebio"
          onChange={handleInputChange}
          id="default-checkbox"
          type="checkbox"
          defaultChecked={userDetails?.disableBio}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
        />
        <label
          htmlFor="default-checkbox"
          className="ms-2 text-sm font-bold text-slate-500 "
        >
          Disable Bio sheet
        </label>
      </div>
      <div className="flex items-center">
        <input
          name="hidename"
          onChange={handleInputChange}
          id="default-checkbox"
          type="checkbox"
          defaultChecked={userDetails?.hideName}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
        />
        <label
          htmlFor="default-checkbox"
          className="ms-2 text-sm font-bold text-slate-500 "
        >
          Hide my name on the leaderboard
        </label>
      </div>

      <div className="flex items-center">
        <input
          name="allcandidates"
          onChange={handleInputChange}
          id="default-checkbox"
          type="checkbox"
          defaultChecked={userDetails?.allCandidates}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
        />
        <label
          htmlFor="default-checkbox"
          className="ms-2 text-sm font-bold text-slate-500 "
        >
          Share all candidates with sub-accounts
        </label>
      </div>

      <div className="flex items-center">
        <input
          name="allpastclient"
          onChange={handleInputChange}
          id="default-checkbox"
          type="checkbox"
          defaultChecked={userDetails?.allPastClient}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
        />
        <label
          htmlFor="default-checkbox"
          className="ms-2 text-sm font-bold text-slate-500 "
        >
          Share all past client
        </label>
      </div>
      <h2 className="font-bold italic text-sm mt-2">
        By default only new client will be shared with your co-brokers. In order
        to share all your past candidates check the box above and click save.
      </h2>

      <div className="flex items-center">
        <input
          name="sharefranchise"
          onChange={handleInputChange}
          id="default-checkbox"
          type="checkbox"
          defaultChecked={userDetails?.shareFranchise}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
        />
        <label
          htmlFor="default-checkbox"
          className="ms-2 text-sm font-bold text-slate-500 "
        >
          Share all private franchise notes with sub-accounts
        </label>
      </div>

      <h1 className="text-custom-heading-color font-bold text-2xl">
        System Integrations
      </h1>

      <div className="candidate-sub-childs" id="leademail">
        <p className="icon-text">IFBCMembers.com Lead Email</p>
        <input
          name="leademail"
          onChange={handleInputChange}
          type="text"
          readOnly
          defaultValue={userDetails?.leadEmail}
          className="candidate-input"
          required
        />
      </div>

      <div className="candidate-sub-childs" id="leadendpoint">
        <p className="icon-text">Hubspot Lead Endpoint</p>
        <input
          onChange={handleInputChange}
          type="text"
          name="leadendpoint"
          className="candidate-input"
          required
        />
      </div>
      <h1 className="text-custom-heading-color font-bold text-2xl">
        Communication Settings
      </h1>
      <p className="ms-2 text-sm font-bold text-slate-500">
        IFBC Certification and Badges
      </p>
      <div className="flex items-center">
        <input
          name="fbabadges"
          onChange={handleInputChange}
          id="default-checkbox"
          type="checkbox"
          defaultChecked={userDetails?.fbaBadges}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
        />
        <label
          htmlFor="default-checkbox"
          className="ms-2 text-sm font-bold text-slate-500 "
        >
          Include your IFBC badges and certificate in your signature.
        </label>
      </div>

      <div id="musicbtn" className="flex gap-5 items-center">
        <p className="icon-text">Signature:</p>
        <button type="submit" className="candidate-secondary-btn inline-flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z"
            />
          </svg>
          ADD MEDIA
        </button>
      </div>

      <div id="settings-save-btn" className="flex justify-center w-full mt-5">
        <button
          type="submit"
          className="candidate-btn inline-flex w-64 text-center justify-center"
        >
          SAVE
        </button>
      </div>
    </div>
  );
};

const Experience = ({ handleInputChange, setShow, userDetails }) => {
  return (
    <div id="experience" className="h-auto w-full col-span-8 p-5">
      <button
        className="absolute top-5 right-10"
        onClick={() => setShow(false)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="red"
          className="size-9"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </button>
      <h1 className="text-custom-heading-color font-bold text-2xl">
        Your Experience
      </h1>

      <div className="mt-3">
        <label className="icon-text mt-2" htmlFor="consulting">
          Consulting Specialties
        </label>
        <select
          name="consulting"
          className="candidate-input w-full"
          id="consulting"
          defaultValue={userDetails?.consulting}
          onChange={handleInputChange}
        >
          <option value="CB">Co-Breaking</option>
          <option value="EB">Emerging Brands</option>
          <option value="IF">International Franchises</option>
          <option value="FS">Financial Services & Analysis</option>
          ...
          <option value="FD">Franchise Development</option>
          <option value="IT">Information Technology</option>
          <option value="LC">Low Cost Franchises</option>
          <option value="MS">Management Skills</option>
          ...
          <option value="MA">Masters / Area Development</option>
          <option value="NS">Negotiation Skills</option>
          <option value="PF">Passive Franchises</option>
          <option value="PI">Process Improvemnet</option>
          ...
          <option value="PM">Project Management</option>
          ...
        </select>
      </div>

      <div className="mt-3">
        <label className="icon-text" htmlFor="franchiseindustryfocus">
          Franchise Industry Focus
        </label>
        <select
          name="franchiseindustryfocus"
          className="candidate-input w-full"
          id="franchiseindustryfocus"
          defaultValue={userDetails?.franchiseIndustryFocus}
          onChange={handleInputChange}
        >
          <option value="EB">Emerging Brands</option>
          <option value="CB">Co-Breaking</option>
          <option value="IF">International Franchises</option>
          <option value="FS">Financial Services & Analysis</option>
          ...
          <option value="FD">Franchise Development</option>
          <option value="IT">Information Technology</option>
          <option value="LC">Low Cost Franchises</option>
          <option value="MS">Management Skills</option>
          ...
          <option value="MA">Masters / Area Development</option>
          <option value="NS">Negotiation Skills</option>
          <option value="PF">Passive Franchises</option>
          <option value="PI">Process Improvemnet</option>
          ...
          <option value="PM">Project Management</option>
          ...
        </select>
      </div>
      <h1 className="text-custom-heading-color font-bold text-lg mt-3">
        Professions and Registrations
      </h1>
      <div className="mt-3 flex items-center">
        <input
          name="businessbroker"
          onChange={handleInputChange}
          id="default-checkbox"
          type="checkbox"
          defaultChecked={userDetails?.businessBroker}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
        />
        <label
          htmlFor="default-checkbox"
          className="ms-2 text-sm font-bold text-slate-500 "
        >
          Business Broker
        </label>
      </div>

      <div className="mt-3">
        <label className="icon-text" htmlFor="registered">
          Registered In
        </label>
        <select
          name="registeredin"
          className="candidate-input w-full"
          id="registered"
          onChange={handleInputChange}
          defaultValue={userDetails?.registeredIn}
        >
          <option value="N">None</option>
          <option value="NY">New York</option>
          <option value="W">Washington</option>
          <option value="B">Both</option>
        </select>
      </div>

      <div className="mt-3 flex items-center">
        <input
          name="openforgroup"
          onChange={handleInputChange}
          id="default-checkbox"
          type="checkbox"
          defaultChecked={userDetails?.openForGroup}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
        />
        <label
          htmlFor="default-checkbox"
          className="ms-2 text-sm font-bold text-slate-500 "
        >
          Open for Group
        </label>
      </div>
      <h2 className="font-bold italic text-sm mt-2">
        The "Open for Group" setting signals your willingness to engage with
        fellow brokers in a collaborative way. This expresses your willingness
        to participate in discussions, share insights, and foster cooperation
        with other brokers.
      </h2>
    </div>
  );
};

const DealActivity = ({ handleInputChange, setShow, userDetails }) => {
  return (
    <div id="Deal-Activity" className="h-auto w-full col-span-8 p-5">
      <button
        className="absolute top-5 right-10"
        onClick={() => setShow(false)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="red"
          className="size-9"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </button>
      <h1 className="text-custom-heading-color font-bold text-2xl">
        Deal Activity
      </h1>
      <div className="flex items-center gap-1">
        <h1 className="icon-text">Franchise Fee:</h1>

        <h1 className="candidate-label text-xl">1</h1>
      </div>
      <div className="flex items-center gap-1">
        <h1 className="icon-text">Deals:</h1>
        <h1 className="candidate-label text-xl">1</h1>
      </div>
      <div className="flex items-center gap-1">
        <h1 className="icon-text">Units:</h1>
        <h1 className="candidate-label text-xl">1</h1>
      </div>
      <h1 className="text-custom-heading-color font-bold text-2xl">
        Research Activity
      </h1>
      <div className="flex items-center gap-1">
        <h1 className="icon-text">Territory Checks:</h1>
        <h1 className="candidate-label text-xl">129</h1>
      </div>
      <div className="flex items-center gap-1">
        <h1 className="icon-text">Formal Registrations:</h1>
        <h1 className="candidate-label text-xl">25</h1>
      </div>
      <button className="candidate-btn mt-3">EDIT YOUR DEALS</button>
    </div>
  );
};

const RightSideBar = ({
  formFields,
  formErrors,
  handleInputChange,
  userDetails,
}) => {
  const states = [
    { value: "AL", text: "Alabama" },
    { value: "AB", text: "Alberta" },
    { value: "AK", text: "Alaska" },
    { value: "AZ", text: "Arizona" },
    { value: "AR", text: "Arkansas" },
    { value: "BC", text: "British Columbia" },
    { value: "CA", text: "California" },
    { value: "CO", text: "Colorado" },
    { value: "CT", text: "Connecticut" },
    { value: "DE", text: "Delaware" },
    { value: "DC", text: "District Of Columbia" },
    { value: "FL", text: "Florida" },
    { value: "GA", text: "Georgia" },
    { value: "HI", text: "Hawaii" },
    { value: "ID", text: "Idaho" },
    { value: "IL", text: "Illinois" },
    { value: "IN", text: "Indiana" },
    { value: "IA", text: "Iowa" },
    { value: "KS", text: "Kansas" },
    { value: "KY", text: "Kentucky" },
    { value: "LA", text: "Louisiana" },
    { value: "ME", text: "Maine" },
    { value: "MB", text: "Manitoba" },
    { value: "MD", text: "Maryland" },
    { value: "MA", text: "Massachusetts" },
    { value: "MI", text: "Michigan" },
    { value: "MN", text: "Minnesota" },
    { value: "MS", text: "Mississippi" },
    { value: "MO", text: "Missouri" },
    { value: "MT", text: "Montana" },
    { value: "NE", text: "Nebraska" },
    { value: "NV", text: "Nevada" },
    { value: "NB", text: "New Brunswick" },
    { value: "NH", text: "New Hampshire" },
    { value: "NJ", text: "New Jersey" },
    { value: "NM", text: "New Mexico" },
    { value: "NY", text: "New York" },
    { value: "NL", text: "Newfoundland and Labrador" },
    { value: "NC", text: "North Carolina" },
    { value: "ND", text: "North Dakota" },
    { value: "NT", text: "Northwest Territories" },
    { value: "NS", text: "Nova Scotia" },
    { value: "NU", text: "Nunavut" },
    { value: "OH", text: "Ohio" },
    { value: "OK", text: "Oklahoma" },
    { value: "ON", text: "Ontario" },
    { value: "OR", text: "Oregon" },
    { value: "PA", text: "Pennsylvania" },
    { value: "PE", text: "Prince Edward Island" },
    { value: "QC", text: "Quebec" },
    { value: "RI", text: "Rhode Island" },
    { value: "SC", text: "South Carolina" },
    { value: "SD", text: "South Dakota" },
    { value: "SK", text: "Saskatchewan" },
    { value: "TN", text: "Tennessee" },
    { value: "TX", text: "Texas" },
    { value: "UT", text: "Utah" },
    { value: "VT", text: "Vermont" },
    { value: "VA", text: "Virginia" },
    { value: "WA", text: "Washington" },
    { value: "WV", text: "West Virginia" },
    { value: "WI", text: "Wisconsin" },
    { value: "WY", text: "Wyoming" },
    { value: "YT", text: "Yukon Territory" },
    { value: "INT", text: "International" },
  ];

  return (
    <div id="right-sidebar-profile" className=" w-full col-span-9 p-5 ">
      {formErrors.error && (
        <p className="border-2 border-red-600 text-red-600 p-4 flex justify-between">
          {formErrors.error}
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
              d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.25-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z"
            />
          </svg>
        </p>
      )}
      <div id="2-column-profile-inputs" className="flex max-md:flex-col gap-6">
        <div id="left-side-inputs" className="  w-full">
          <h1 className="text-custom-heading-color font-bold text-2xl">
            Your IFBC Profile Information
          </h1>
          <div className="candidate-sub-childs">
            <p className="candidate-label">First Name</p>
            <input
              onChange={handleInputChange}
              type="text"
              name="firstname"
              className="candidate-input"
              required
              defaultValue={userDetails?.firstName}
            />
          </div>
          <div className="candidate-sub-childs">
            <p className="candidate-label">Last Name</p>
            <input
              onChange={handleInputChange}
              type="text"
              name="lastname"
              className="candidate-input"
              required
              defaultValue={userDetails?.lastName}
            />
          </div>
          <div className="candidate-sub-childs">
            <p className="candidate-label">Email</p>
            <input
              onChange={handleInputChange}
              type="email"
              name="email"
              className="candidate-input"
              required
              defaultValue={userDetails?.email}
            />
          </div>
          <div className="candidate-sub-childs">
            <p className="candidate-label">Website URL</p>
            <input
              onChange={handleInputChange}
              type="text"
              name="websiteurl"
              className="candidate-input"
              required
              defaultValue={userDetails?.websiteUrl}
            />
          </div>
          <div className="candidate-sub-childs">
            <p className="candidate-label">LinkedIn URL</p>
            <input
              onChange={handleInputChange}
              type="text"
              name="linkedinurl"
              className="candidate-input"
              required
              defaultValue={userDetails?.linkedinUrl}
            />
          </div>
          <div className="candidate-sub-childs">
            <p className="candidate-label">Meeting Link</p>
            <input
              onChange={handleInputChange}
              type="text"
              name="meetinglink"
              className="candidate-input"
              required
              defaultValue={userDetails?.meetingLink}
            />
          </div>
        </div>

        <div id="right-side-inputs" className="h-auto w-full">
          <h1 className="text-custom-heading-color font-bold text-2xl">
            Your Company Information
          </h1>
          <div className="candidate-sub-childs">
            <p className="candidate-label">Company Name:</p>
            <input
              onChange={handleInputChange}
              type="text"
              name="companyname"
              className="candidate-input"
              required
              defaultValue={userDetails?.companyName}
            />
          </div>
          <div className="candidate-sub-childs">
            <p className="candidate-label">Phone Number:</p>
            <input
              onChange={handleInputChange}
              type="text"
              name="companyphonenumber"
              className="candidate-input"
              required
              defaultValue={userDetails?.companyPhoneNumber}
            />
          </div>
          <div className="candidate-sub-childs">
            <p className="candidate-label">Address:</p>
            <input
              onChange={handleInputChange}
              type="text"
              name="companyaddress"
              className="candidate-input"
              required
              defaultValue={userDetails?.companyAddress}
            />
          </div>
          <div className="candidate-sub-childs">
            <p className="candidate-label">City:</p>
            <input
              onChange={handleInputChange}
              type="text"
              name="city"
              className="candidate-input"
              required
              defaultValue={userDetails?.city}
            />
          </div>
          <div className="candidate-sub-childs">
            <p className="candidate-label">State/Province:</p>
            <select
              onChange={handleInputChange}
              id="state"
              className="candidate-input p-3"
              name="state"
              defaultValue={userDetails?.state}
            >
              {states.map((state, index) => (
                <option key={index} value={state.value}>
                  {state.text}
                </option>
              ))}
            </select>
          </div>
          <div className="candidate-sub-childs">
            <p className="candidate-label">Zip/Postal Code</p>
            <input
              placeholder="90212"
              onChange={handleInputChange}
              type="text"
              name="zippostalcode"
              className="candidate-input"
              required
              defaultValue={userDetails?.zipPostalCode}
            />
          </div>
        </div>
      </div>
      <div className="candidate-sub-childs w-full col-span-8">
        <p className="candidate-label">Unit/Suite #:</p>
        <input
          onChange={handleInputChange}
          type="text"
          name="unitsuite"
          className="candidate-input"
          required
          defaultValue={userDetails?.unitSuite}
        />
      </div>
      <div>
        <label htmlFor="message" className="candidate-label">
          Notes
        </label>
        <textarea
          name="notes"
          onChange={handleInputChange}
          id="message"
          rows={5}
          className="candidate-input"
          defaultValue={userDetails?.notes}
        />
      </div>
      <div className="candidate-sub-childs">
        <p className="candidate-label">Short Description:</p>
        <input
          onChange={handleInputChange}
          type="text"
          name="shortdescription"
          className="candidate-input"
          required
          defaultValue={userDetails?.shortDescription}
        />
      </div>
    </div>
  );
};

export default Profile;
