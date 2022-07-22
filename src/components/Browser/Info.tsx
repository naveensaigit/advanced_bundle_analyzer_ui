import { fileData, folderData } from "./Browser";

function formatSize(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

function Info({entry}: {entry: fileData | folderData}) {
  let lazy = entry.alreadyLazyLoaded, nonlazy = entry.canBeLazyLoaded, cantBeLazy=entry.canNotBeLazyLoaded;
  if(typeof lazy === "number" && typeof nonlazy === "number" && typeof cantBeLazy === "number")
    return (
      <div>
        <p className="break-all"><b>Name: </b>{entry.name}</p>
        <p className="break-all"><b>Path: </b>{entry.path}</p>
        <p className="break-all"><b>Size: </b>{formatSize(entry.size)}</p>
        <p className="break-all"><b>Sub-Folders: </b>{entry.noOfSubFolders}</p>
        <p className="break-all"><b>Sub-Files: </b>{entry.noOfSubFiles}</p>
        {
          lazy > 0 ?
          <p className="break-all"><b>Already lazy loaded:&nbsp;</b>
            <span className="text-[#34AC36]">
              {(lazy * 100 / (lazy + nonlazy + cantBeLazy)).toFixed(2)}%
            </span>
          </p>
          : ""
        }
        {
          nonlazy > 0 ?
          <p className="break-all"><b>To be lazy loaded:&nbsp;</b>
            <span className="text-[#E1245E]">
              {(nonlazy * 100 / (lazy + nonlazy + cantBeLazy)).toFixed(2)}%
            </span>
          </p>
          : ""
        }
        {
          cantBeLazy > 0 ?
          <p className="break-all"><b>Can&apos;t be lazy loaded:&nbsp;</b>
            <span className="text-[#808080]">
              {(cantBeLazy * 100 / (lazy + nonlazy + cantBeLazy)).toFixed(2)}%
            </span>
          </p>
          : ""
        }
      </div>
    )
  else if(typeof lazy === "number" && typeof nonlazy !== "number" && typeof cantBeLazy === "number") {
    nonlazy = Object.keys(nonlazy).length;
    return (
      <div>
        <p className="break-all"><b>Name: </b>{entry.name}</p>
        <p className="break-all"><b>Path: </b>{entry.path}</p>
        <p className="break-all"><b>Size: </b>{formatSize(entry.size)}</p>
        {
          lazy > 0 ?
          <p className="break-all"><b>Already lazy loaded:&nbsp;</b>
            <span className="text-[#34AC36]">
              {(lazy * 100 / (lazy + nonlazy + cantBeLazy)).toFixed(2)}%
            </span>
          </p>
          : ""
        }
        {
          nonlazy > 0 ?
          <p className="break-all"><b>To be lazy loaded:&nbsp;</b>
            <span className="text-[#E1245E]">
              {(nonlazy * 100 / (lazy + nonlazy + cantBeLazy)).toFixed(2)}%
            </span>
          </p>
          : ""
        }
        {
          cantBeLazy > 0 ?
          <p className="break-all"><b>Can&apos;t be lazy loaded:&nbsp;</b>
            <span className="text-[#808080]">
              {(cantBeLazy * 100 / (lazy + nonlazy + cantBeLazy)).toFixed(2)}%
            </span>
          </p>
          : ""
        }
      </div>
    )
  }
  return <></>;
}

export default Info;