import Header from "../Header/Header";
import React from "react";
import PieChartGraph from "./pieChart";
import dataObj from "../data.json";
import FileDetails from "./FileDetails";

export default function review({ route }: { route: string }) {
  return (
    <>
      <Header route={route + " : review"} />
      <div style={{ width: "14%", minWidth: 180, margin: "auto", marginTop: 40 }}>
        <PieChartGraph dataObj={dataObj} route={route} />
      </div>
      <FileDetails dataObj={dataObj} route={route} />
    </>
  );
}
