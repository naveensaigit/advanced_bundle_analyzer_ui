import * as React from "react";
import { useRouter } from 'next/router';
import Drawer from "@mui/material/Drawer";
import PieChartComponent from "../Review/pieChart";
import LaunchIcon from '@mui/icons-material/Launch';
import IconButton from "@mui/material/IconButton";
import dataObj from '../data.json';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CloseIcon from '@mui/icons-material/Close';

type Props = {
  visible: boolean;
  closePane: () => void;
  route: string;
};

export default function SlidingPanel({ visible, closePane, route }: Props) {
  const router = useRouter();
  return (
    <>
      {({ route }) ?
        <div>
          <Drawer
            anchor={"right"}
            open={visible}
            onClose={closePane}
            PaperProps={{
              sx: { width: "25%", backgroundColor: "#282828" },
            }}
          >
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Typography
                style={{marginTop:8, marginLeft:6}}
                variant="h6"
                noWrap
                align="left"
                component="span"
                sx={{ flexGrow: 1, color: 'white' }}
              >
                Quick Review
              </Typography>
              <IconButton onClick={() => router.push('/review' + route)} size="large">
                <LaunchIcon sx={{ color: 'white' }} />
              </IconButton>
              <IconButton onClick={closePane} size="large">
                <CloseIcon sx={{ color: 'white' }} />
              </IconButton>
            </Box>
            <div style={{ width: "14%", minWidth: 180, margin: "auto", marginTop: 10 }}>
              <PieChartComponent dataObj={dataObj} route={route} />
            </div>
          </Drawer>
        </div>
        :
        <></>}
    </>
  );
}