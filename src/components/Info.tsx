import { fileData, folderData } from "./Homepage";

function formatSize(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

function Info({entry}: {entry: fileData | folderData}) {

  if(typeof entry.canBeLazyLoaded == "number" && typeof entry.totalLazyLoaded == "number")
    return (
      <div>
        <p><b>Name: </b>{entry.name}</p>
        <p><b>Path: </b>{entry.path}</p>
        <p><b>Size: </b>{formatSize(entry.size)}</p>
        <p><b>Sub-Folders: </b>{entry.noOfSubFolders}</p>
        <p><b>Sub-Files: </b>{entry.noOfSubFiles}</p>
        {
          entry.totalLazyLoaded > 0 ?
          <p><b>Already lazy loaded:&nbsp;</b>
            <span className="text-[#34AC36]">
              {entry.totalLazyLoaded * 100 / (entry.totalLazyLoaded + entry.canBeLazyLoaded)}%
            </span>
          </p>
          : ""
        }
        {
          entry.canBeLazyLoaded > 0 ? 
          <p><b>To be lazy loaded:&nbsp;</b>
            <span className="text-[#E1245E]">
              {entry.canBeLazyLoaded * 100 / (entry.totalLazyLoaded + entry.canBeLazyLoaded)}%
            </span>
          </p>
          : ""
        }
      </div>
    )
  else if(typeof entry.canBeLazyLoaded != "number" && typeof entry.totalLazyLoaded != "number")
  return (
    <div>
      <p><b>Name: </b>{entry.name}</p>
      <p><b>Path: </b>{entry.path}</p>
      <p><b>Size: </b>{formatSize(entry.size)}</p>
      {
        entry.totalLazyLoaded.length > 0 ?
        <p><b>Already lazy loaded:&nbsp;</b>
          <span className="text-[#34AC36]">
            {entry.totalLazyLoaded.length * 100 / (entry.totalLazyLoaded.length + entry.canBeLazyLoaded.length)}%
          </span>
        </p>
        : ""
      }
      {
        entry.canBeLazyLoaded.length > 0 ? 
        <p><b>To be lazy loaded:&nbsp;</b>
          <span className="text-[#E1245E]">
            {entry.canBeLazyLoaded.length * 100 / (entry.totalLazyLoaded.length + entry.canBeLazyLoaded.length)}%
          </span>
        </p>
        : ""
      }
    </div>
  )
  return <></>;
}

export default Info;