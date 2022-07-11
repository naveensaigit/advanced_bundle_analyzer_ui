import { Chart, ArcElement, Tooltip, Title, Legend } from "chart.js";
Chart.register(ArcElement, Tooltip, Title, Legend);
import { Pie } from "react-chartjs-2";
import { data } from "../Browser";

function PieChartComponent({dataObj, route}: {dataObj: data;route: string;}) {
  const labels = ["Already Lazy Loaded", "Can Be Lazy Loaded"];
  const datasets = [
    {
      data: [0, 0],
      backgroundColor: ["#34AC36", "#E1245E"],
      borderColor: ["#000000"],
      borderWidth: 1.75,
      pointBackgroundColor: "rgba(255,206,86,0.2)",
    }
  ];

  Chart.overrides.pie.plugins.legend.labels.color = 'white';
  Chart.defaults.font.size = 14;

  const routerData: data = dataObj[route];

  let can: number = 0;
  let already: number = 0;

  if (
    typeof routerData.canBeLazyLoaded === "number" &&
    typeof routerData.totalLazyLoaded === "number"
  ) {
    can = routerData.canBeLazyLoaded;
    already = routerData.totalLazyLoaded;
  } else if (
    typeof routerData.canBeLazyLoaded === "object" &&
    typeof routerData.totalLazyLoaded === "object"
  ) {
    can = routerData.canBeLazyLoaded.length;
    already = routerData.totalLazyLoaded.length;
  }

  if (can === 0 && already === 0) already = 1;

  datasets[0].data[0] = already;
  datasets[0].data[1] = can;

  return <Pie 
  data={{
    labels: labels,
    datasets: datasets,
  }} />;
}

export default PieChartComponent;