import React from "react";

const PolicyContent = ({ isContact }) => {
  return (
    <p
      className={`text-xs text-custom-heading-color text-justify  ${isContact ? "" : "max-md:p-3 md:p-5 md:max-w-[80%] "} rounded-3xl `}
    >
      By submitting this form, you agree to receive calls, texts, or emails.
      Standard message and data rates may apply. Reply STOP to unsubscribe from
      texts. See our{" "}
      <a href="/terms-conditions" className="  underline">
        Terms & Conditions
      </a>{" "}
      and{" "}
      <a href="/privacy-policy" className="  underline">
        Privacy Policy
      </a>{" "}
      for more details.
    </p>
  );
};

export default PolicyContent;
