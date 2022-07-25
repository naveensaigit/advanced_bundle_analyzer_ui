import Header from "../Header/Header";
import React from "react";
import DoughnutChartComponent from "./DoughnutChart";
import originalDataObj from "../data.json";
import FileDetails from "./FileDetails";
import { data } from "../Browser/Browser";
import { UpdateDataObj } from "../Browser/Browser";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from "@mui/material/IconButton";
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

function clearSavedPreferences() : void{
  dataObj = JSON.parse(JSON.stringify(originalDataObj));

  for(let path in dataObj){
    if(typeof dataObj[path].canBeLazyLoaded  === "object"){
      let imp = dataObj[path].canBeLazyLoaded;

      if(typeof imp === "number")   continue;

      for(let suggestion in imp){
        if(localStorage.getItem(imp[suggestion].path + ":" + imp[suggestion].exportName)){
          localStorage.removeItem(imp[suggestion].path + ":" + imp[suggestion].exportName);
        }
      }
    }
  }

  window.dispatchEvent(new Event("clearPreferences"));
}

export default function Review({ route }: { route: string }) {
  if (typeof window !== "undefined")  window.dispatchEvent(new Event("storage"));
  
  const router = useRouter();
  return (
    <>
      <Header route={route + " : review"} />
      <DoughnutChartComponent dataObj={dataObj} route={route} />
      <FileDetails dataObj={dataObj} route={route} />
      <IconButton
        onClick={() => {
          clearSavedPreferences();
          router.push("/browse");
        }}
        size="large">
        <DeleteIcon sx={{ color: "white" }} />
      </IconButton>
    </>
  );
}
