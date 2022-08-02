import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import ClearIcon from '@mui/icons-material/Clear';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { data } from '../Browser/Browser'
import { canBeLazy } from "../Browser/Browser";
import { useRouter } from 'next/router';

let currentRow: string = "";

function RemoveSuggestion(nonlazy: number | canBeLazy, row: string) {
  if (!nonlazy || typeof nonlazy === "number") return

  let key: string = nonlazy[currentRow].path + ':' + nonlazy[currentRow].exportName;
  window.localStorage.setItem(key, "true");
  window.dispatchEvent(new Event("storage"));
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 380,
  bgcolor: '#282828',
  border: '0.5px solid white',
  boxShadow: 24,
  pt: 4,
  pl: 4,
  pr: 4,
  pb: 3,
};

export default function BasicTable({ dataObj, subFiles }: { dataObj: data; subFiles: string[]; }) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      {
        subFiles.map((file) => {
          let lazy = dataObj[file].alreadyLazyLoaded, nonlazy: number | canBeLazy = dataObj[file].canBeLazyLoaded;
          let can: number = 0, already: number = 0;
          return (typeof lazy === "number" && typeof nonlazy === "object" && Object.keys(nonlazy).length > 0) ?
            <div key={file}>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ color: "#E1245E" }}>
                    Notification
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2, color: "white", mb: 4 }}>
                  Removing a suggestion will redirect you to the root directory!
                  </Typography>
                  <Button variant="outlined" color="error" sx={{ ml: 7.5, fontWeight:'700'  }} onClick={() => {
                    RemoveSuggestion(nonlazy, currentRow);
                    router.push("/browse");
                  }}>
                    Remove Suggestion
                  </Button>
                </Box>
              </Modal>

              <TableContainer component={Paper} sx={{ width: "95%", margin: "auto", marginBottom: 5, borderRadius: 5, overflow: 'hidden' }}>
                <Table sx={{ minWidth: 65, borderRadius: 100 }} aria-label="simple table">
                  <TableHead sx={{ backgroundColor: "#1C1C1F", borderBottom: '2px solid black', height:40 }}>
                    <TableRow>
                      <TableCell sx={{ width: 80, minWidth: 80, color: "white", fontSize: 22 }}>
                        <span style={{ color: '#34AC36', fontWeight: 700 }}>{lazy}</span> - <span style={{ color: '#E1245E', fontWeight: 700 }}>{Object.keys(Object.keys(nonlazy)).length}</span>
                      </TableCell>
                      <TableCell sx={{ width: 310, minWidth: 310, color: "white", fontSize: 20, fontWeight: 550 }} >{file.slice(file.lastIndexOf('/') + 1, file.length)}</TableCell>
                      <TableCell sx={{ color: "white", fontSize: 18 }} >{file}</TableCell>
                      <TableCell align="center" sx={{ color: "white", fontSize: 15, width: 70 }} >Delete</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody >
                    {Object.keys(nonlazy).map((row: string) => {
                      if (typeof nonlazy === "number") return <></>;
                      return (
                        <TableRow key={row} sx={{ backgroundColor: "#E1245E", borderBottom: '2px solid black' }} >
                          <TableCell component="th" scope="row" align="center" sx={{ fontSize: 17, fontWeight: 400, padding:'10px' }}>
                            {(++can + already)}.
                          </TableCell>
                          <TableCell sx={{ borderLeft: '2px solid black', fontSize: 17, fontWeight: 400, padding:'10px' }}>{row}</TableCell>
                          <TableCell sx={{ borderLeft: '2px solid black', fontSize: 17, fontWeight: 400, whiteSpace: 'nowrap', padding:'10px'}}>{nonlazy[row].path}</TableCell>
                          <TableCell align="center" sx={{ borderLeft: '2px solid black', fontSize: 17, fontWeight: 400, padding:'10px' }}>
                          <IconButton onClick={() => {
                              currentRow = row;
                              handleOpen();}
                            }
                              size="small">
                              <ClearIcon sx={{ color: '#323232'}} />
                            </IconButton>
                          </TableCell>
                        </TableRow>);
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            : <></>
        })
      }
    </>
  );
}