import React from "react";
import { DisplayBox, TabEdit, LinkInterface, ApiHelper, UserHelper } from ".";

interface Props { updatedFunction?: () => void }
export const Tabs: React.FC<Props> = (props) => {
  const [tabs, setTabs] = React.useState<LinkInterface[]>([]);
  const [currentTab, setCurrentTab] = React.useState<LinkInterface>(null);

  const handleUpdated = () => { setCurrentTab(null); loadData(); if (props.updatedFunction !== undefined) props.updatedFunction(); }
  const getEditContent = () => <a href="about:blank" onClick={handleAdd}><i className="fas fa-plus"></i></a>
  const loadData = () => { ApiHelper.get("/links?category=tab", "B1Api").then(data => setTabs(data)); }
  const saveChanges = () => { ApiHelper.post("/links", tabs, "B1Api").then(loadData); }

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    let tab: LinkInterface = { churchId: UserHelper.currentChurch.id, sort: tabs.length, text: "", url: "", icon: "fas fa-link", linkData: "", linkType: "url", category: "tab" }
    setCurrentTab(tab);
  }

  const makeSortSequential = () => {
    for (let i = 0; i < tabs.length; i++) tabs[i].sort = i + 1;
  }

  const moveUp = (e: React.MouseEvent) => {
    e.preventDefault();
    const idx = parseInt(e.currentTarget.getAttribute("data-idx"));
    makeSortSequential();
    tabs[idx - 1].sort++;
    tabs[idx].sort--;
    saveChanges();
  }

  const moveDown = (e: React.MouseEvent) => {
    e.preventDefault();
    const idx = parseInt(e.currentTarget.getAttribute("data-idx"));
    makeSortSequential();
    tabs[idx].sort++;
    tabs[idx + 1].sort--;
    saveChanges();
  }

  const getRows = () => {
    let idx = 0;
    let rows: JSX.Element[] = [];
    tabs.forEach(tab => {
      const upLink = (idx === 0) ? null : <a href="about:blank" data-idx={idx} onClick={moveUp}><i className="fas fa-arrow-up"></i></a>
      const downLink = (idx === tabs.length - 1) ? null : <a href="about:blank" data-idx={idx} onClick={moveDown}><i className="fas fa-arrow-down"></i></a>
      rows.push(
        <tr key={idx}>
          <td><a href={tab.url}><i className={tab.icon} /> {tab.text}</a></td>
          <td className="text-right">
            {upLink}
            {downLink}
            <a href="about:blank" onClick={(e: React.MouseEvent) => { e.preventDefault(); setCurrentTab(tab); }}><i className="fas fa-pencil-alt"></i></a>
          </td>
        </tr>
      );
      idx++;
    })
    return rows;
  }

  React.useEffect(() => { loadData(); }, []);

  if (currentTab !== null) return <TabEdit currentTab={currentTab} updatedFunction={handleUpdated} />;
  else return (
    <DisplayBox headerIcon="fas fa-folder" headerText="Tabs" editContent={getEditContent()}>
      <table className="table table-sm">
        <tbody>
          {getRows()}
        </tbody>
      </table>
    </DisplayBox>

  );

}
