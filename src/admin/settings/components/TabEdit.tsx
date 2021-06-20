import React from "react";
import { InputBox, LinkInterface, ApiHelper, UniqueIdHelper } from "."
import { PageInterface, UserHelper, EnvironmentHelper } from ".";

interface Props { currentTab: LinkInterface, updatedFunction?: () => void }

export const TabEdit: React.FC<Props> = (props) => {
  const [currentTab, setCurrentTab] = React.useState<LinkInterface>(null);
  const [pages, setPages] = React.useState<PageInterface[]>(null);
  const checkDelete = () => { if (!UniqueIdHelper.isMissing(currentTab?.id)) return handleDelete; else return null; }
  const handleCancel = () => { props.updatedFunction(); }
  const loadPages = () => { ApiHelper.get("/pages/", "B1Api").then((data: PageInterface[]) => setPages(data)) }

  const handleDelete = () => {
    if (window.confirm("Are you sure you wish to delete this tab?")) {
      ApiHelper.delete("/links/" + currentTab.id, "B1Api").then(() => { setCurrentTab(null); props.updatedFunction(); });
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const val = e.currentTarget.value;
    let t = { ...currentTab };
    switch (e.currentTarget.name) {
      case "text": t.text = val; break;
      case "type": t.linkType = val; break;
      case "page": t.linkData = val; break;
      case "url": t.url = val; break;
    }
    setCurrentTab(t);
  }

  const handleSave = () => {
    //if (currentTab.linkType === "page") currentTab.url = "/data/" + UserHelper.currentSettings.keyName + "/page" + currentTab.linkData + ".html";
    //else
    if (currentTab.linkType !== "url") currentTab.url = "";
    if (currentTab.linkType === "page") {
      const rnd = Math.floor(Math.random() * 999999);
      currentTab.url = EnvironmentHelper.ContentRoot + "/" + UserHelper.currentChurch.id + "/pages/" + currentTab.linkData + ".html?rnd=" + rnd.toString();
    }
    ApiHelper.post("/links", [currentTab], "B1Api").then(props.updatedFunction);
  }

  const initIcon = (e: React.MouseEvent) => {
    e.preventDefault();
    let target: any = $(e.currentTarget);
    target.iconpicker()
      .on("change", (e: any) => {
        let t = { ...currentTab };
        t.icon = e.icon;
        setCurrentTab(t);
      });
    target.click();
  }

  const getUrl = () => {
    if (currentTab?.linkType === "url") {
      return (
        <div className="form-group">
          <label>Url</label>
          <input type="text" className="form-control" name="url" value={currentTab?.url} onChange={handleChange} />
        </div>
      );
    } else return null;
  }

  const getPage = () => {
    if (currentTab?.linkType === "page") {
      let options: JSX.Element[] = [];
      if (pages === null) loadPages();
      else {
        options = [];
        pages.forEach(page => options.push(<option value={page.id} key={page.id}>{page.name}</option>));
      }
      return (
        <div className="form-group">
          <label>Page</label>
          <select className="form-control" name="page" value={currentTab?.linkData} onChange={handleChange}>
            {options}
          </select>
        </div>
      );
    } else return null;
  }

  React.useEffect(() => { setCurrentTab(props.currentTab); }, [props.currentTab]);

  return (
    <>
      <InputBox headerIcon="fas fa-folder" headerText="Edit Tab" saveFunction={handleSave} cancelFunction={handleCancel} deleteFunction={checkDelete()}>
        <div className="form-group">
          <label>Text</label>
          <div className="input-group">
            <input type="text" className="form-control" name="text" value={currentTab?.text} onChange={handleChange} />
            <div className="input-group-append">
              <button className="btn btn-secondary iconpicker dropdown-toggle" name="TabIcon" id="TabIcon" data-icon={currentTab?.icon} data-iconset="fontawesome5" onClick={initIcon}>
                <i className={currentTab?.icon}></i>
                <span className="caret"></span>
              </button>
            </div>
          </div>
          <input type="hidden" asp-for="TabId" />
        </div>
        <div className="form-group">
          <label>Type</label>
          <select className="form-control" name="type" value={currentTab?.linkType} onChange={handleChange}>
            <option value="url">External Url</option>
            <option value="page">Page</option>
            <option value="directory">Member Directory</option>
            <option value="stream">Live Stream</option>
            <option value="checkin">Checkin</option>
          </select>
        </div>
        {getUrl()}
        {getPage()}
      </InputBox>
    </>
  );
}
