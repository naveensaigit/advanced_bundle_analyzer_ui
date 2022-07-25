import { useRouter } from "next/router";
import Drawer from "@mui/material/Drawer";
import LaunchIcon from "@mui/icons-material/Launch";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import originalDataObj from "../data.json";
import DoughnutChartComponent from "./DoughnutChart";
import FileDetails from "./FileDetails";
import { data } from "../Browser/Browser";
import { UpdateDataObj } from "../Browser/Browser";

let dataObj: data = JSON.parse(JSON.stringify(originalDataObj));

if (typeof window !== "undefined") {
  window.addEventListener("storage", () => {
    dataObj = UpdateDataObj();
    // JSON.stringify(dataObj, undefined, 2);
  });

  window.addEventListener("clearPreferences", () => {
    dataObj = JSON.parse(JSON.stringify(originalDataObj));
  });
}

export default function SlidingPanel() {
  if (typeof window !== "undefined")  window.dispatchEvent(new Event("storage"));
  
  const router = useRouter(),
    route = router.query.review;

  if (typeof route !== "string") return <></>;

  const closePane = () =>
    router.push(router.asPath.split("?")[0], undefined, { shallow: true });

  return (
    <div>
      <Drawer
        anchor={"right"}
        open={route !== undefined}
        onClose={closePane}
        PaperProps={{
          sx: {
            width: "25%",
            minWidth: "280px",
            maxWidth: "100%",
            backgroundColor: "#282828",
          },
        }}
      >
        <Box sx={{ display: { md: "flex", backgroundColor: "#1C1C1F" } }}>
          <Typography
            style={{ marginTop: 8, marginLeft: 6 }}
            variant="h6"
            noWrap
            align="left"
            component="span"
            sx={{ flexGrow: 1, color: "white" }}
          >
            Quick Review
          </Typography>
          <IconButton
            onClick={() => router.push("/review" + route)}
            size="large"
          >
            <LaunchIcon sx={{ color: "white" }} />
          </IconButton>
          <IconButton onClick={closePane} size="large">
            <CloseIcon sx={{ color: "white" }} />
          </IconButton>
        </Box>
        <DoughnutChartComponent dataObj={dataObj} route={route} />
        <FileDetails dataObj={dataObj} route={route} />
      </Drawer>
    </div>
  );
}
