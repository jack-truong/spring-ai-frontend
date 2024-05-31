import { GiRobotHelmet } from "react-icons/gi";
import {BreedInfo} from "../services/AiDogService.ts";
import {DataGrid} from "@mui/x-data-grid";
import {CircularProgress} from "@mui/material";

type DogDetailsGridProps = {
  breedInfo: BreedInfo | undefined;
};

const DogDetailsGrid = ({breedInfo}: DogDetailsGridProps) => {
  if (!breedInfo) {
    return <CircularProgress/>;
  }

  const columns = [
    {
      field: "name",
      flex: 1,
      headerName: "Characteristic"
    },
    {
      field: "value",
      flex: 5,
      headerName: "Value"
    }
  ]

  const rows = breedInfo.characteristics.map((characteristic, index) => {
    return {
      id: index,
      ...characteristic
    }
  })

  return <DataGrid
      rows={rows}
      columns={columns}
      rowSelection={false}
  />
}

export default DogDetailsGrid;