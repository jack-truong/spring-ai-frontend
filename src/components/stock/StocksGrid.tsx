import {DataGrid} from "@mui/x-data-grid";
import Loading from "../Loading.tsx";
import {Stock} from "../../services/AiStockService.ts";
import {SxProps, Theme} from "@mui/material";

type StocksGridProps = {
  stocks: Array<Stock>;
  sx?: SxProps<Theme>;
};

const StocksGrid = ({stocks}: StocksGridProps) => {
  if (!stocks) {
    return <Loading label={"stocks"}/>;
  }

  const columns = [
    {
      field: "symbol",
      flex: 1,
      headerName: "Symbol",
      headerClassName: "styledHeader"
    },
    {
      field: "company",
      flex: 5,
      headerName: "Value",
      headerClassName: "styledHeader"
    }
  ]

  const rows = stocks.map((stock, index) => {
    return {
      id: index,
      ...stock
    }
  })

  return <DataGrid
      rows={rows}
      columns={columns}
      hideFooter
      showColumnVerticalBorder
      showCellVerticalBorder
  />
}

export default StocksGrid;
