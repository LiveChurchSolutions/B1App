import React from "react";
import { UserHelper } from "."
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { ConfigurationInterface, LinkInterface, Permissions } from "../helpers"

interface Props { config: ConfigurationInterface }

export const Sidebar: React.FC<Props> = (props) => {


    const location = useLocation()

    const getSelected = (): string => {
        var url = location.pathname;
        var result = "people";
        if (url.indexOf("/admin/settings") > -1) result = "settings";
        return result;
    }

    const getClass = (sectionName: string): string => {
        if (sectionName === getSelected()) return "nav-link active";
        else return "nav-link";
    }

    const getTab = (tab: LinkInterface) => {
        return (<li key={tab.id} className="nav-item" id={tab.id}><Link className={getClass("tab")} to={tab.url}><i className={tab.icon}></i> {tab.text}</Link></li>);
    }

    const getTabs = () => {
        var tabs: JSX.Element[] = [];
        if (props.config?.tabs) {
            props.config.tabs.forEach(t => {
                tabs.push(getTab(t))
            });
        }
        if (UserHelper.checkAccess(Permissions.b1Api.settings.edit)) tabs.push(<li key="settings" className="nav-item"><Link className={getClass("settings")} to="/admin/settings"><i className="fas fa-cog"></i> Settings</Link></li>);

        tabs.push()
        return tabs;
    }

    return (
        <>
            <div id="userName"><i className="fas fa-user" /> &nbsp; {UserHelper.user.displayName}</div>
            <ul className="nav flex-column" id="sideNav" >
                {getTabs()}
                <li key="logout" className="nav-item" ><a className="nav-link" href="about:blank"><i className="fas fa-sign-out-alt"></i> Log out</a></li>
            </ul>
        </>
    );
}