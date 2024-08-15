import * as React from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
const steps = [
  {
    label: "Candidate Profile",
    description:
      "Welcome! Let's start by creating your candidate profile. This information will help us understand your background and preferences.",
  },
  {
    label: "Initial Qualifying",
    description:
      "Please answer the following qualifying questions to help us determine your initial eligibility for the program. This will only take a few minutes.",
  },
  {
    label: "Eligibility",
    description:
      "Based on the information provided, we will assess your eligibility for the next steps. Please ensure that all your details are accurate.",
  },
  {
    label: "Experience",
    description:
      "Tell us about your professional experience. This information is crucial to match you with the best opportunities suited to your skills and background.",
  },
  {
    label: "Wants",
    description:
      "What are you looking for in your next opportunity? Share your preferences and aspirations to help us find the best fit for you.",
  },
  {
    label: "Franchise Categories",
    description:
      "Please select the franchise categories that interest you the most. This will help us tailor the opportunities presented to you.",
  },
  {
    label: "Reference",
    description:
      "Please provide a reference who can vouch for your qualifications and experience. This helps us validate the information provided and move forward with your application.",
  },
];

export default function HorizontalNonLinearStepper({
  activeStep,
  setActiveStep,
}) {
  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className="col-span-5 bg-white p-5 rounded-tl-3xl rounded-bl-3xl">
      <ProgressBar activeStep={activeStep} />
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </div>
  );
}

const ProgressBar = ({ activeStep }) => {
  const totalSteps = steps.length;
  const progressPercentage = (activeStep / totalSteps) * 100;
  return (
    <div className="progress-container mb-5  bg-custom-dark-blue/10 p-2 rounded-3xl">
      <div className="p-3">
        <h1 className="text-custom-heading-color text-sm capitalize">
          Currently {activeStep} out of 7 steps completed
        </h1>
        <div
          className="progress-bar bg-[#2b7cff] mt-2 rounded-[1em] flex justify-center items-center "
          style={{
            width: `${progressPercentage === 0 ? 10 : progressPercentage + 14}%`,
          }}
        >
          <div className="progress-text text-left  text-white text-sm">
            <span>{progressPercentage.toFixed(0)}% </span>
          </div>
        </div>
      </div>
    </div>
  );
};
