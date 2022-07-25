import { color } from "@mui/system";
import { Chart, ArcElement, Tooltip, Title, Legend } from "chart.js";
import { Doughnut  } from "react-chartjs-2";
import { data } from "../Browser/Browser";

Chart.register(ArcElement, Tooltip, Title, Legend);

function DoughnutChartComponent({dataObj, route}: {dataObj: data, route: string}) {
  const labels = ["Already ", "Can ", "Can't"];
  const datasets = [
    {
      data: [0, 0, 0],
      backgroundColor: ["#34AC36", "#E1245E", "#808080"],
      borderColor: ["#1C1C1F"],
      borderWidth: 1.75,
      pointBackgroundColor: "#1C1C1F",
    }
  ];

  Chart.overrides.doughnut.plugins.legend.labels.color = 'white';
  Chart.overrides.doughnut.plugins.legend.position = 'right';
  Chart.defaults.font.size = 14;

  const routerData: data = dataObj[route];

  let can: number = 0;
  let already: number = 0;
  let canNot: number = 0;

  if (
    typeof routerData.canBeLazyLoaded === "number" &&
    typeof routerData.alreadyLazyLoaded === "number" &&
    typeof routerData.canNotBeLazyLoaded === "number"
  ) {
    can = routerData.canBeLazyLoaded;
    already = routerData.alreadyLazyLoaded;
    canNot = routerData.canNotBeLazyLoaded;
  } else if (
    typeof routerData.canBeLazyLoaded === "object" &&
    typeof routerData.alreadyLazyLoaded === "number" &&
    typeof routerData.canNotBeLazyLoaded === "number"
  ) {
    can = Object.keys(routerData.canBeLazyLoaded).length;
    already = routerData.alreadyLazyLoaded;
    canNot = routerData.canNotBeLazyLoaded;
  }

  if (can === 0 && already === 0 && canNot === 0) canNot = 0;

  datasets[0].data[0] = already;
  datasets[0].data[1] = can;
  datasets[0].data[2] = canNot;

  // labels[0] += ' : ' + (already*100)/(can + already + canNot) + ' %';
  // labels[1] += ' : ' + (can*100)/(can + already + canNot) + ' %';
  // labels[2] += ' : ' + (can*100)/(can + already + canNot) + ' %';

  return (
    <div style={{ width: "25%", minWidth: 300, margin: "auto", marginTop: 10, marginBottom: 30 }}>
      <Doughnut
        data={{
          labels: labels,
          datasets: datasets,
        }}
      />
    </div>
  );
}

export default DoughnutChartComponent;