import React from "react";
import { UserHelper } from "../helpers";
import { DirectorySearch } from "./components/DirectorySearch";
import { Person } from "./components/Person";

export const DirectoryPage = () => {

  const [personId, setPersonId] = React.useState("");

  const handlePersonSelected = (personId: string) => {
    console.log("PERSON SELECTED: " + personId)
    setPersonId(personId);
  }
  const handleBack = () => { setPersonId(""); }

  const getContent = () => {
    let result = <h1 style={{ textAlign: "center" }}>Please login</h1>
    if (UserHelper.user?.firstName) {
      if (personId) result = <Person personId={personId} backHandler={handleBack} selectedHandler={handlePersonSelected} />
      else result = <DirectorySearch selectedHandler={handlePersonSelected} />
    }
    return result;
  }

  return (
    <div style={{ height: "100vh", backgroundColor: "#F9F9F9", padding: 20 }}>
      {getContent()}
    </div>);
}
