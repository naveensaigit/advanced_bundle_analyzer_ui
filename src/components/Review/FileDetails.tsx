import TableGenerator from "./TableGenerator";
import { data, fileData } from "../Browser/Browser";

function getFilesDetailsDFS(dataObj: data, entry: string) {
  let subFiles: string[] = [];
  const routerData: data = dataObj[entry];

  if (
    (routerData &&
      typeof routerData.canBeLazyLoaded === "object" &&
      routerData.canBeLazyLoaded.length > 0) ||
    (routerData &&
      typeof routerData.totalLazyLoaded === "object" &&
      routerData.totalLazyLoaded.length > 0)
  ) {
    subFiles.push(entry);
  } else if (routerData && typeof routerData["foldersInside"] === "object") {
    for (let subFolder in routerData["foldersInside"]) {
      subFiles.concat(
        getFilesDetailsDFS(dataObj, routerData["foldersInside"][subFolder])
      );
    }
  }
  if (routerData && typeof routerData["filesInside"] === "object") {
    for (let subFile in routerData["filesInside"]) {
      const file = routerData["filesInside"][subFile];

      const fileData: data = dataObj[file];
      if (
        (fileData &&
          typeof fileData.canBeLazyLoaded === "object" &&
          fileData.canBeLazyLoaded.length > 0) ||
        (fileData &&
          typeof fileData.totalLazyLoaded === "object" &&
          fileData.totalLazyLoaded.length > 0)
      )
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

  return <TableGenerator dataObj={dataObj} subFiles={subFiles} />
}
