import {BarSeriesType} from "@mui/x-charts/models/seriesType/bar";
import {ComponentPropsWithoutRef} from "react";
import {AxisConfig, BarChart} from "@mui/x-charts";
import {SxProps, Theme} from "@mui/material";

interface BarChartProps extends ComponentPropsWithoutRef<typeof BarChart> {
  series: BarSeriesType;
  xLabels: Array<any>;
  sx?: SxProps<Theme>;
}

function getMinAndMax(series: BarSeriesType) {
  let max = 0;
  let min = 0;
  series.forEach((element: { data: number[]; }) => {
    element.data.forEach((value: number) => {
      max = Math.max(max, value)
      min = Math.min(min, value)
    });
  });
  max = Math.min(100, max + 5);
  min = Math.max(-100, min - 5);
  return {max, min};
}

const BarChartComponent = ({series, xLabels, sx, ...rest}: BarChartProps) => {
  let {max, min} = getMinAndMax(series);

  return (
      <BarChart
          sx={{
            "& .MuiChartsAxis-tickContainer .MuiChartsAxis-tickLabel":{
              // fontFamily: "Roboto",
              fontWeight: "bold"
            },
            ...(Array.isArray(sx) ? sx : [sx])
          }}
          series={series}
          grid={{
            horizontal: true,
            vertical: true
          }}
          xAxis={[
            {
              data: xLabels,
              scaleType: 'band',
            } as Omit<AxisConfig, 'id'>,
          ]}
          yAxis={[
            {
              max: max,
              min: min
            }
          ]}
          {...rest}
      />
  );
}

export default BarChartComponent;
