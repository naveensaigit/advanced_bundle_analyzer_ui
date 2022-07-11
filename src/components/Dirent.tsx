import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import FolderIcon from '@mui/icons-material/Folder';
import CodeIcon from '@mui/icons-material/Code';
import Info from './Info';
import { fileData, folderData } from "./Homepage";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#282828',
  ...theme.typography.body2,
  color: "#F1F1F1",
  height: "120px",
  width: "150px"
}));

const InfoTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#202020',
    color: '#F1F1F1',
    maxWidth: 200,
    fontSize: theme.typography.pxToRem(12),
    boxShadow: '0 0 1px #F1F1F1'
  },
}));

function Dirent({entry}: {entry: fileData | folderData}) {
  // Folder
  let color;
  if(typeof entry.canBeLazyLoaded == "number")
    color = entry.canBeLazyLoaded > 0 ? "E1245E" : "34AC36";
  else
    color = entry.canBeLazyLoaded.length > 0 ? "E1245E" : "34AC36";
  return (
    <InfoTooltip
        title={<Info entry={entry}/>}
        placement="top-start"
        followCursor={true}
    >
      <Item className='grid justify-center items-center hover:cursor-pointer hover:bg-[#202020]' elevation={0}>
        <div className='mt-5'>
          {entry.filesInside ?
          <FolderIcon className='scale-[4]' style={{color}}/>
          : <CodeIcon className='scale-[4]' style={{color}}/>
          }
        </div>
        <div className='mt-2'>
          {entry.name}
        </div>
      </Item>
    </InfoTooltip>
  )
}

export default Dirent;