import Header from "../Header/Header";
import React from "react";
import PieChartComponent from "./pieChart";
import dataObj from "../data.json";
import FileDetails from "./FileDetails";

export default function review({ route }: { route: string }) {
  return (
    <>
      <Header route={route + " : review"} />
      <PieChartComponent dataObj={dataObj} route={route} />
      <FileDetails dataObj={dataObj} route={route} />
    </>
  );
}
