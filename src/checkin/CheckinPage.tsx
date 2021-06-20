import React from "react";
import { UserHelper } from "../helpers";
import { Household } from "./components/Household";
import { Services } from "./components/Services";
import { CheckinComplete } from "./components/CheckinComplete";
import { ConfigurationInterface } from "../components";
import { AppearanceHelper } from "../appBase/helpers/AppearanceHelper";

interface Props { config?: ConfigurationInterface }

export const CheckinPage: React.FC<Props> = (props) => {

  const [currentStep, setCurrentStep] = React.useState<string>("");

  const handleServiceSelected = () => {
    setCurrentStep("household");
  }

  const handleCheckinComplete = () => {
    setCurrentStep("complete");
  }

  const getContent = () => {
    let result = <h1 style={{ textAlign: "center" }}>Please login</h1>
    if (UserHelper.user?.displayName) {
      switch (currentStep) {
        case "household":
          result = <Household completeHandler={handleCheckinComplete} />
          break;
        case "complete":
          result = <CheckinComplete />
          break;
        default:
          result = <Services selectedHandler={handleServiceSelected} />;
          break;
      }
    }
    return result;
  }

  return (
    <div style={{ height: "100vh", backgroundColor: "#F9F9F9" }}>
      <div style={{ backgroundColor: "var(--primaryColor)", textAlign: "center", padding: 20 }}>
        <img src={AppearanceHelper.getLogoLight(props.config?.appearance, "/images/logo.png")} alt="logo" style={{ maxHeight: 300 }} />
      </div>
      <div style={{ maxWidth: 600, marginLeft: "auto", marginRight: "auto", paddingTop: 20 }}>
        {getContent()}
      </div>

    </div>);
}
