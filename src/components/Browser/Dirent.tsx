import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import FolderIcon from '@mui/icons-material/Folder';
import CodeIcon from '@mui/icons-material/Code';
import Info from './Info';
import { fileData, folderData } from "./Browser";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#282828',
  ...theme.typography.body2,
  color: "#F1F1F1",
  height: "120px",
  width: "150px",
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

function centreEllipsis(text: string, id: string, padding: number = 20): void {
  const element = document.getElementById(id) || document.createElement("div");
  const canvas: HTMLCanvasElement = document.createElement("canvas");
  const context: CanvasRenderingContext2D | null = canvas.getContext("2d");

  if(context === null) return ;

  const maxWidth: number = (element.parentElement?.offsetWidth || padding) - padding;
  context.font = window.getComputedStyle(element).getPropertyValue("font");
  const metrics = context.measureText(text);

  if(metrics.width < maxWidth) {
    element.innerHTML = text;
    return ;
  }

  let left: string = "", middle: string = "...", right: string[] = [], char: string = "";
  let ind: number = 0, width: number = context.measureText(middle).width, letterWidth: number = 0;

  while(width < maxWidth) {
    char = text.at(ind) || "";
    letterWidth = context.measureText(char).width;
    if(width + letterWidth > maxWidth)
      break;
    left += char;
    width += letterWidth;
    ind++;

    char = text.at(-ind) || "";
    letterWidth = context.measureText(char).width;
    if(width + letterWidth > maxWidth)
      break;
    right.push(char);
    width += letterWidth;
  }

  element.innerHTML = left + middle + right.reverse().join("");
};

function Dirent({entry}: {entry: fileData | folderData}) {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    centreEllipsis(entry.name, `dirent-${entry.name}`);
  }, [entry.name]);

  let color;
  if(typeof entry.canBeLazyLoaded === "number")
    color = entry.canBeLazyLoaded > 0 ? "#E1245E" : "#34AC36";
  else
    color = entry.canBeLazyLoaded.length > 0 ? "#E1245E" : "#34AC36";

  return (
    <InfoTooltip
      title={<Info entry={entry}/>}
      placement="top-start"
      followCursor={true}
      open={showTooltip}
      onMouseMoveCapture={_ => !showTooltip && setShowTooltip(true)}
      onMouseLeave={_ => setShowTooltip(false)}
    >
      <Item className='grid justify-center items-center hover:cursor-pointer hover:bg-[#202020]' elevation={0}>
        <div className='mt-5'>
          {
            entry.filesInside ?
            <FolderIcon className='scale-[4]' style={{color}}/> :
            <CodeIcon className='scale-[4]' style={{color}}/>
          }
        </div>
        <div className='mt-2' id={`dirent-${entry.name}`}>
          <p></p>
        </div>
      </Item>
    </InfoTooltip>
  )
}

export default Dirent;