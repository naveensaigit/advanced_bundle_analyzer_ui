import TableGenerator from "./TableGenerator";
import { data } from "../Browser/Browser";

function getFilesDetailsDFS(dataObj: data, entry: string) {
  let subFiles: string[] = [];
  const routerData: data = dataObj[entry];

  if(!routerData) return [];

  if (typeof routerData.canBeLazyLoaded === "object" && Object.keys(routerData.canBeLazyLoaded).length > 0)
    subFiles.push(entry);
  else if (typeof routerData.foldersInside === "object")
    for (let subFolder in routerData.foldersInside)
      subFiles.push(...getFilesDetailsDFS(dataObj, routerData.foldersInside[subFolder]));
  if (typeof routerData.filesInside === "object") {
    for (let subFile in routerData.filesInside) {
      const file = routerData.filesInside[subFile];
      const fileData: data = dataObj[file];
      if (typeof fileData.canBeLazyLoaded === "object" && Object.keys(fileData.canBeLazyLoaded).length > 0)
        subFiles.push(file);
    }
  }

  return subFiles;
}

export default function FileDetails({
  dataObj,
  route,
}: {
  dataObj: data;
  route: string;
}) {
  let subFiles: string[] = getFilesDetailsDFS(dataObj, route);

  return (
    <>
      <TableGenerator dataObj={dataObj} subFiles={subFiles} />
    </>
  );
}
