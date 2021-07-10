import React from "react";
import { UserHelper } from "."
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { EnvironmentHelper, LinkInterface, Permissions, ConfigHelper } from "../helpers"
import { PersonHelper } from "../helpers";

interface Props { tabClickHandler: (linkType: string, linkData: string, url: string) => void }

export const Sidebar: React.FC<Props> = (props) => {

  const location = useLocation()

  const getSelected = (): string => {
    let url = location.pathname;
    let result = "people";
    if (url.indexOf("/admin/settings") > -1) result = "settings";
    return result;
  }

  const getClass = (sectionName: string): string => {
    if (sectionName === getSelected()) return "nav-link active";
    else return "nav-link";
  }

  const getTab = (tab: LinkInterface) => (<li key={tab.id} className="nav-item" id={tab.id}><a href="about:blank" onClick={(e) => { e.preventDefault(); props.tabClickHandler(tab.linkType, tab.linkData, tab.url) }} className={getClass("tab")}><i className={tab.icon}></i> {tab.text}</a></li>)

  const getUserTabs = () => {
    let tabs: JSX.Element[] = [];
    tabs.push(<li key="bible" className="nav-item"><a href="about:blank" onClick={(e) => { e.preventDefault(); props.tabClickHandler("bible", "", "") }} className={getClass("bible")}><i className="fas fa-bible"></i> Bible</a></li>);

    if (UserHelper.checkAccess(Permissions.b1Api.settings.edit)) tabs.push(<li key="settings" className="nav-item"><Link className={getClass("settings")} to="/admin/settings"><i className="fas fa-cog"></i> Settings</Link></li>);
    return tabs;
  }

  const getTabs = () => {
    let tabs: JSX.Element[] = [];
    if (ConfigHelper.current?.tabs) {
      ConfigHelper.current.tabs.forEach(t => {
        tabs.push(getTab(t))
      });
    }
    return tabs;
  }

  const getUser = () => {
    let photo = <i className="fas fa-user" />;
    let name = "Anonymous";
    const { firstName, lastName } = UserHelper.user || {};
    if (firstName) name = `${firstName} ${lastName}`;
    if (PersonHelper.person?.name) name = PersonHelper.person.name.display;
    if (PersonHelper.person?.photo) photo = <img src={EnvironmentHelper.ContentRoot + PersonHelper.person.photo} alt="avatar" />
    return <div id="userName">{photo} {name}</div>
  }

  const getLoginLink = () => {
    if (UserHelper.user) return (<Link className={getClass("logout")} to="/logout"><i className="fas fa-sign-out-alt"></i> Log out</Link>);
    else return (<Link className={getClass("login")} to="/login"><i className="fas fa-sign-in-alt"></i> Log in</Link>);
  }

  return (
    <>
      {getUser()}
      <ul className="nav flex-column sideNav">
        {getUserTabs()}
        <li key="logout" className="nav-item">
          {getLoginLink()}
        </li>
      </ul>
      <br />
      <div className="sidebarChurch">{ConfigHelper.current?.church.name}</div>
      <ul className="nav flex-column sideNav" id="sideNav">
        {getTabs()}
      </ul>
    </>
  );
}
