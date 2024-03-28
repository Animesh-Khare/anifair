import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";
import FYBarChart from "../../shared/FYBarChart";
import FYBox from "../../shared/FYBox";
import FYTypography from "../../shared/FYTypography";
import { equal, getDayOftheWeek } from "../../utils/javascript";
import { chartLabels } from "../../description/dashboard.description";
import useStyles from "./style";
import { useTranslation } from "react-i18next";

const Visitors = ({ visitorData }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

  const modifyToWeeklyChartData = (data) => {
    data?.forEach((obj) => {
      const weekDay = getDayOftheWeek(obj._id);
      obj.day = weekDay;
      obj.label = chartLabels[weekDay];
    });

    return data;
  };

  if (!visitorData?.data?.length) return null;

  const chartData = modifyToWeeklyChartData(visitorData?.data);
  const data = {
    labels: chartData.map((data) => data?.label),
    datasets: [
      {
        data: chartData.map((data) => data?.count),
        backgroundColor: [
          "#D3D3D3",
          "#D3D3D3",
          "#D3D3D3",
          "#D3D3D3",
          "#D3D3D3",
          "#D3D3D3",
          "#D3D3D3",
        ],
        borderWidth: 0,
        barPercentage: 0.8,
        categoryPercentage: 0.8,
      },
    ],
  };

  const highestValue = Math.max(...data.datasets[0].data);
  const highestIndices = [];
  data.datasets[0].data.forEach((value, index) => {
    if (equal(value, highestValue)) highestIndices.push(index);
  });
  highestIndices.forEach((index) => {
    data.datasets[0].backgroundColor[index] = "#1B1B1B";
  });

  const options = {
    scales: {
      x: {
        display: true,
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
      },
      y: {
        display: false,
        ticks: {
          stepSize: 10,
          min: 0,
          max: visitorData?.totalCount,
        },
      },
    },
    tooltip: {
      mode: "index",
      intersect: true,
    },
  };

  return (
    <FYBox>
      <FYTypography fontWeight="700" mb={3}>
        {t("visitors")}
      </FYTypography>
      <FYBox>
        <FYBox
          backgroundColor="black.main"
          color="white.main"
          display="inline-block"
          borderRadius={2}
          px={1.5}
          py={1}
          boxShadow="0px 2px 4px 0px rgba(0, 0, 0, 0.10), 0px 0px 1px 0px #000 inset, 0px 4px 8px 0px rgba(0, 0, 0, 0.10)"
        >
          <FYTypography
            component="p"
            variant="body2"
            mb={0.5}
            sx={{ "&.MuiTypography-root": { fontSize: 12 } }}
          >
            {t("thisWeek")}
          </FYTypography>
          <FYTypography
            component="p"
            variant="body2"
            fontWeight="500"
            display="flex"
            alignItems="center"
          >
            <FYTypography
              component="span"
              width={12}
              height={12}
              backgroundColor="secondary.main"
              mr={0.8}
              borderRadius={0.5}
              sx={{ "&.MuiTypography-root": { fontSize: 12 } }}
            />
            {visitorData?.totalCount} {t("visitors").toLowerCase()}
          </FYTypography>
        </FYBox>
        <FYBox className={classes.chartBox} width="100%">
          <FYBarChart data={data} options={options} />
        </FYBox>
      </FYBox>
    </FYBox>
  );
};

export default Visitors;
