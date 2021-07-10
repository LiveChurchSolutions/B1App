import React from "react";
import { useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import { ApiHelper, ConfigHelper, PersonHelper, UserHelper } from "./components";
import { Authenticated } from "./Authenticated";
import UserContext from "./UserContext";
import { LoginPage } from "./appBase/pageComponents/LoginPage";
import { AppearanceHelper } from "./appBase/helpers/AppearanceHelper";

export const Login: React.FC = (props: any) => {
  const [cookies] = useCookies(["jwt"]);
  let { from } = (useLocation().state as any) || { from: { pathname: "/" } };

  const successCallback = async () => {
    PersonHelper.person = await ApiHelper.get(`/people/${UserHelper.currentChurch.personId}`, "MembershipApi");
    context.setUserName(UserHelper.currentChurch.id.toString());
  }

  const context = React.useContext(UserContext);

  if (context.userName === "" || !ApiHelper.isAuthenticated) {
    let search = new URLSearchParams(props.location.search);
    let jwt = search.get("jwt") || cookies.jwt;
    let auth = search.get("auth");
    if (!jwt) jwt = "";
    if (!auth) auth = "";

    return (
      <LoginPage
        auth={auth}
        context={context}
        jwt={jwt}
        successCallback={successCallback}
        requiredKeyName={false}
        appName="B1"
        logo={AppearanceHelper.getLogoLight(ConfigHelper.current?.appearance, null)}
      />
    );
  } else {
    let path = from.pathname;
    return <Authenticated location={path}></Authenticated>;
  }
};
