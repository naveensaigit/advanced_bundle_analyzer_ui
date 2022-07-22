import Header from '../Header/Header';
import GridView from "./GridView"
import dataObj from "../data.json";

export type importStatements = {
  path: string,
  exportName: string | null
}

export type canBeLazy = {
  [key: string]: importStatements     // Here key is the importName used for importing a component in a file.
}

// Information stored for a file
export type fileData = {
  name: string,
  path: string,
  size: number,
  type: string,
  alreadyLazyLoaded: number,
  canBeLazyLoaded: canBeLazy,
  canNotBeLazyLoaded: number,
  parentFolder: string,
  [key: string]: any
}

// Information stored for a folder
export type folderData = {
  name: string,
  path: string,
  size: number,
  noOfSubFolders: number,
  noOfSubFiles: number,
  alreadyLazyLoaded: number,
  canBeLazyLoaded: number,
  canNotBeLazyLoaded: number,
  foldersInside: string[],
  filesInside: string[],
  parentFolder: string,
  [key: string]: any
}

// Type for global data object
// "entry" - fileData or folderData
export type data = {
  [key: string]: fileData | folderData
}

function Browser({route}: {route: string}) {
  return (
    <>
      <Header route={route}/>
      <GridView dataObj={dataObj} route={route}/>
    </>
  );
}

export default Browser;