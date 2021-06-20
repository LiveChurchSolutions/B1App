import React from "react";
import { DisplayBox, PageInterface } from "."

interface Props { pages: PageInterface[], addFunction?: () => void, editFunction?: (page: PageInterface) => void }

export const PageList: React.FC<Props> = (props) => {
  const getEditContent = () => <a href="about:blank" onClick={handleAdd}><i className="fas fa-plus"></i></a>
  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    props.addFunction();
  }

  const getRows = () => {
    if (props.pages.length === 0) return (<tr><td>Pages are small pieces of information that you can include add as a tab in the B1 app.  Click the plus icon to add a page.</td></tr>);
    else {
      let rows: JSX.Element[] = [];
      props.pages.forEach(page => {
        rows.push(
          <tr>
            <td>{page.name}</td>
            <td className="text-right">
              <a href="about:blank" onClick={(e: React.MouseEvent) => { e.preventDefault(); props.editFunction(page); }}><i className="fas fa-pencil-alt"></i></a>
            </td>
          </tr>
        );
      });
      return rows;
    }

  }

  return (
    <DisplayBox headerIcon="fas fa-code" headerText="Pages" editContent={getEditContent()}>
      <table className="table table-sm">
        {getRows()}
      </table>
    </DisplayBox>
  );
}
