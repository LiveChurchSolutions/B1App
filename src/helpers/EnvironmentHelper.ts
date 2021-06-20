import { ApiHelper } from "../appBase/helpers/ApiHelper";

export class EnvironmentHelper {
    private static AccessApi = "";
    private static B1Api = "";
    private static MembershipApi = "";
    private static AttendanceApi = "";
    static ContentRoot = "";
    static ChurchAppsUrl = "";

    static init = () => {
      switch (process.env.REACT_APP_STAGE) {
        case "staging": EnvironmentHelper.initStaging(); break;
        case "prod": EnvironmentHelper.initProd(); break;
        default: EnvironmentHelper.initDev(); break;
      }
      ApiHelper.apiConfigs = [
        { keyName: "AccessApi", url: EnvironmentHelper.AccessApi, jwt: "", permisssions: [] },
        { keyName: "AttendanceApi", url: EnvironmentHelper.AttendanceApi, jwt: "", permisssions: [] },
        { keyName: "MembershipApi", url: EnvironmentHelper.MembershipApi, jwt: "", permisssions: [] },
        { keyName: "B1Api", url: EnvironmentHelper.B1Api, jwt: "", permisssions: [] }
      ];
    }

    static initDev = () => {
      EnvironmentHelper.AccessApi = process.env.REACT_APP_ACCESS_API || "";
      EnvironmentHelper.MembershipApi = process.env.REACT_APP_MEMBERSHIP_API || "";
      EnvironmentHelper.AttendanceApi = process.env.REACT_APP_ATTENDANCE_API || "";
      EnvironmentHelper.B1Api = process.env.REACT_APP_B1_API || "";
      EnvironmentHelper.ContentRoot = process.env.REACT_APP_CONTENT_ROOT || "";
      EnvironmentHelper.ChurchAppsUrl = process.env.REACT_APP_CHURCH_APPS_URL || "";
    }

    //NOTE: None of these values are secret.
    static initStaging = () => {
      EnvironmentHelper.AccessApi = "https://accessapi.staging.churchapps.org";
      EnvironmentHelper.AttendanceApi = "https://attendanceapi.staging.churchapps.org";
      EnvironmentHelper.MembershipApi = "https://membershipapi.staging.churchapps.org";
      EnvironmentHelper.B1Api = "https://api.staging.b1.church";
      EnvironmentHelper.ContentRoot = "https://content.staging.churchapps.org";
      EnvironmentHelper.ChurchAppsUrl = "https://staging.churchapps.org";
    }

    //NOTE: None of these values are secret.
    static initProd = () => {
      EnvironmentHelper.AccessApi = "https://accessapi.churchapps.org";
      EnvironmentHelper.AttendanceApi = "https://attendanceapi.churchapps.org";
      EnvironmentHelper.MembershipApi = "https://membershipapi.churchapps.org";
      EnvironmentHelper.B1Api = "https://api.b1.church";
      EnvironmentHelper.ContentRoot = "https://content.churchapps.org";
      EnvironmentHelper.ChurchAppsUrl = "https://churchapps.org"
    }

}
