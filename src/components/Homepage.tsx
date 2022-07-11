import Header from './Header/Header';
import GridView from "./GridView";
import dataObj from "./data.json";

// Type to store the components in totalLazyLoaded or canBeLazyLoaded
export type component = {
  name: string,
  path: string
}

// Information stored for a file
export type fileData = {
  name: string,
  path: string,
  size: number,
  type: string,
  totalLazyLoaded: component[],
  canBeLazyLoaded: component[],
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
  totalLazyLoaded: number,
  canBeLazyLoaded: number,
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

function Homepage({route}: {route: string}) {
  return (
    <>
      <Header route={route}/>
      <GridView dataObj={dataObj} route={route}/>
    </>
  );
}

export default Homepage;