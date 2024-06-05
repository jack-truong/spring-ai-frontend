import {Box, TextField, Typography} from "@mui/material";
import Loading from "../Loading.tsx";
import {StockRecommendation} from "../../services/AiStockService.ts";
import {LineChart, LineSeriesType} from "@mui/x-charts";
import BarChartComponent from "../charts/BarChartComponent.tsx";
import {MakeOptional} from "@mui/x-charts/models/helpers";

type StockGainsPanelProps = {
  stockRecommendation: StockRecommendation | undefined;
};

const getLineChart = (
    series: MakeOptional<LineSeriesType, "type">[],
    xLabels: (string | undefined)[],
) => {
  return (
      <LineChart
          height={GRAPH_HEIGHT}
          series={series}
          xAxis={[{scaleType: 'point', data: xLabels}]}
          colors={CHART_COLORS}
      />
  );
}

const GRAPH_HEIGHT = 400;
const CHART_COLORS = ["lightblue", "darkseagreen", "lightcoral","mediumorchid", "lightgray"];

const StockGainsPanel = ({stockRecommendation}: StockGainsPanelProps) => {
  const seriesBar = stockRecommendation?.values.map(value => {
    return {
      data: [value.percentageGain],
      label: value.symbol,
    }
  })

  const xLabelsBar = [`Percent Gain from ${stockRecommendation?.values?.[0].stockStart.date} to ${stockRecommendation?.values?.[0].stockEnd.date}`];

  const seriesLine = stockRecommendation?.values.map(value => {
    return {
      data: [value.stockStart.close, value.stockMiddle.close, value.stockEnd.close],
      label: value.symbol,
    }
  })

  const xLabelsLine = [stockRecommendation?.values?.[0].stockStart.date, stockRecommendation?.values?.[0].stockMiddle.date, stockRecommendation?.values?.[0].stockEnd.date];
  const lineChartDescription = `Stock values from ${stockRecommendation?.values?.[0].stockStart.date} to ${stockRecommendation?.values?.[0].stockEnd.date}`;

  return (
      !stockRecommendation ? <Loading label={"historical stock info"}/> :
          <Box sx={{display: "flex", flexDirection: 'row'}}>
            <Box flex={3}>
              <BarChartComponent
                  series={seriesBar}
                  xLabels={[""]}
                  height={GRAPH_HEIGHT}
                  colors={CHART_COLORS}
              />
              <Typography sx={{fontWeight: "bold"}} align={"center"}>{xLabelsBar}</Typography>
            </Box>
            <Box flex={3}>
              {getLineChart(seriesLine, xLabelsLine)}
              <Typography sx={{fontWeight: "bold"}} align={"center"}>{lineChartDescription}</Typography>
            </Box>
            <Box flex={2} alignContent={"center"}>
              <TextField
                  label={"Recommendation"}
                  multiline
                  maxRows={Infinity}
                  variant={"outlined"}
                  sx={{width: "100%"}}
                  value={stockRecommendation?.verboseRecommendation}
              />
            </Box>
          </Box>
  );
}

export default StockGainsPanel;
