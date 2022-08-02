import Header from "../Header/Header";
import React from "react";
import DoughnutChartComponent from "./DoughnutChart";
import originalDataObj from "../data.json";
import FileDetails from "./FileDetails";
import { data } from "../Browser/Browser";
import { UpdateDataObj } from "../Browser/Browser";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';

let dataObj: data = JSON.parse(JSON.stringify(originalDataObj));

if (typeof window !== "undefined") {
  window.addEventListener("storage", () => {
    dataObj = UpdateDataObj();
  });

  window.addEventListener("clearPreferences", () => {
    dataObj = JSON.parse(JSON.stringify(originalDataObj));
  });
}

function clearSavedPreferences(): void {
  dataObj = JSON.parse(JSON.stringify(originalDataObj));

  for (let path in dataObj) {
    if (typeof dataObj[path].canBeLazyLoaded === "object") {
      let imp = dataObj[path].canBeLazyLoaded;

      if (typeof imp === "number") continue;

      for (let suggestion in imp) {
        if (localStorage.getItem(imp[suggestion].path + ":" + imp[suggestion].exportName)) {
          localStorage.removeItem(imp[suggestion].path + ":" + imp[suggestion].exportName);
        }
      }
    }
  }

  window.dispatchEvent(new Event("clearPreferences"));
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

export default function Review({ route }: { route: string }) {
  if (typeof window !== "undefined") window.dispatchEvent(new Event("storage"));

  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
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
            Clearing your saved preferences will reload this page and all the removed suggestions will re-appear! 
          </Typography>
          <Button variant="outlined" color="success" sx={{ ml: 14.5, fontWeight:'700' }} onClick={() => {
            clearSavedPreferences();
            router.reload();
          }}>
            Clear
          </Button>
        </Box>
      </Modal>
      <Header route={route + " : review"} />
      <DoughnutChartComponent dataObj={dataObj} route={route} />
      <Button variant="outlined" color="success" sx={{ mb: 5, fontWeight:'700' }} onClick={() => {
        handleOpen();
      }}>
        Clear Saved Preferences
      </Button>
      <FileDetails dataObj={dataObj} route={route} />
    </>
  );
}
