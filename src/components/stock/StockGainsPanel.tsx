import {useEffect, useState} from "react";
import {Box, TextField} from "@mui/material";
import Loading from "../Loading.tsx";
import {StockRecommendation} from "../../services/AiStockService.ts";
import {AxisConfig, BarChart, LineChart} from "@mui/x-charts";

type StockGainsPanelProps = {
  stockRecommendation: StockRecommendation | undefined;
};

const getLineChart = (series, xLabels) => {
  return (
      <LineChart
          width={500}
          height={300}
          series={series}
          xAxis={[{ scaleType: 'point', data: xLabels }]}
      />
  );
}

const getBarChart = (series, xLabels) => {
  return (
      <BarChart
          width={500}
          height={300}
          series={series}
          xAxis={[
            {
              data: xLabels,
              scaleType: 'band',
            } as Omit<AxisConfig, 'id'>,
          ]}
          yAxis={[{ max: 1000 }]}
      />
  );
}

const StockGainsPanel = ({stockRecommendation}: StockGainsPanelProps) => {

  const series = stockRecommendation?.values.map(value => {
    return {
      data: [value.stockStart.close, value.stockEnd.close],
      label: value.symbol,
    }
  })

  const xLabels = [stockRecommendation?.values?.[0].stockStart.date, stockRecommendation?.values?.[0].stockEnd.date];

  console.log("### series: ", series);
  console.log("### labels: ", xLabels);
  return (
      !stockRecommendation ? <Loading label={"historical stock info"}/> :
          <Box sx={{display: "flex", flexDirection: 'row'}}>
            <Box flex={3}>
              {getLineChart(series, xLabels)}
            </Box>
            <Box flex={2} alignContent={"center"}>
              <TextField
                  label={"Narrative"}
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
