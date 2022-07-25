import Header from "../Header/Header";
import GridView from "./GridView";
import originalDataObj from "../data.json";
import React from "react";

export type importStatements = {
  path: string;
  exportName: string | null;
};

export type canBeLazy = {
  [key: string]: importStatements; // Here key is the importName used for importing a component in a file.
};

// Information stored for a file
export type fileData = {
  name: string;
  path: string;
  size: number;
  type: string;
  alreadyLazyLoaded: number;
  canBeLazyLoaded: canBeLazy;
  canNotBeLazyLoaded: number;
  parentFolder: string;
  [key: string]: any;
};

// Information stored for a folder
export type folderData = {
  name: string;
  path: string;
  size: number;
  noOfSubFolders: number;
  noOfSubFiles: number;
  alreadyLazyLoaded: number;
  canBeLazyLoaded: number;
  canNotBeLazyLoaded: number;
  foldersInside: string[];
  filesInside: string[];
  parentFolder: string;
  [key: string]: any;
};

export type data = {
  [key: string]: fileData | folderData;
};

let dataObj: data = JSON.parse(JSON.stringify(originalDataObj));

function DFS(path: string) {
  let folders: string[] = dataObj[path].foldersInside;
  for (let subFolder of folders) DFS(subFolder);

  let count: number = 0;
  let noOfSubFolders: number = 0;
  let noOfSubFiles: number = 0;
  let size: number = 0;

  for (let subFile of dataObj[path].filesInside) {
    let imp = dataObj[subFile].canBeLazyLoaded;

    if (typeof imp === "number" || typeof imp === "undefined") continue;

    count += Object.keys(imp).length;
    noOfSubFiles++;
    size += dataObj[subFile].size;
  }

  for (let subFolder of dataObj[path].foldersInside) {
    let subImp = dataObj[subFolder].canBeLazyLoaded;
    if (typeof subImp !== "number" || typeof subImp === "undefined") continue;
    count += subImp;
    noOfSubFolders += 1+dataObj[subFolder].noOfSubFolders;
    noOfSubFiles += dataObj[subFolder].noOfSubFiles;
    size += dataObj[subFolder].size;
  }

  dataObj[path].canBeLazyLoaded = count;
  dataObj[path].noOfSubFiles = noOfSubFiles;
  dataObj[path].noOfSubFolders = noOfSubFolders;
  dataObj[path].size = size;

  if (
    dataObj[path] &&
    dataObj[path].canBeLazyLoaded === 0 &&
    dataObj[path].alreadyLazyLoaded === 0 &&
    dataObj[path].canNotBeLazyLoaded === 0 &&
    path !== "/"
  ) {
    const parent: string = dataObj[path].parentFolder;
    let index = dataObj[parent].foldersInside.indexOf(path);
    dataObj[parent].foldersInside.splice(index, index + 1);
    delete dataObj[path];
  }
}

export function UpdateDataObj() {
  let allPaths: string[] = Object.keys(dataObj);

  for (let path of allPaths) {
    if (!dataObj[path].canBeLazyLoaded || typeof dataObj[path].canBeLazyLoaded === "number")
      continue;

    Object.keys(dataObj[path].canBeLazyLoaded).forEach((suggestion) => {
      let dataImp: number | canBeLazy = dataObj[path].canBeLazyLoaded;

      if (!dataImp || typeof dataImp === "number" || typeof localStorage === "undefined")
        return;

      if (localStorage.getItem(dataImp[suggestion].path + ":" + dataImp[suggestion].exportName)) {
        delete dataImp[suggestion];
      }

      if (Object.keys(dataImp).length > 0 || dataObj[path].alreadyLazyLoaded > 0 || dataObj[path].canNotBeLazyLoaded > 0) {
        dataObj[path].canBeLazyLoaded = dataImp;
      }
      else {
        const parent: string = dataObj[path].parentFolder;
        let index = dataObj[parent].filesInside.indexOf(path);
        dataObj[parent].filesInside.splice(index, index + 1);
        delete dataObj[path];
      }
    });
  }

  DFS("/");

  return dataObj;
}

if (typeof window !== "undefined") {
  window.addEventListener("storage", () => {
    dataObj = UpdateDataObj();
  });

  window.addEventListener("clearPreferences", () => {
    dataObj = JSON.parse(JSON.stringify(originalDataObj));
  });
}

function Browser({ route }: { route: string }) {
  if (typeof window !== "undefined") window.dispatchEvent(new Event("storage"));
  dataObj = UpdateDataObj();

  return (
    <>
      <Header route={route} />
      <GridView dataObj={dataObj} route={route} />
    </>
  );
}

export default Browser;
