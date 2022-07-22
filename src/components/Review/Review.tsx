import Header from "../Header/Header";
import React from "react";
import DoughnutChartComponent from "./DoughnutChart";
import dataObj from "../data.json";
import FileDetails from "./FileDetails";

export default function review({ route }: { route: string }) {
  return (
    <>
      <Header route={route + " : review"} />
      <DoughnutChartComponent dataObj={dataObj} route={route} />
      <FileDetails dataObj={dataObj} route={route} />
    </>
  );
}
