import {DataGrid} from "@mui/x-data-grid";
import Loading from "../Loading.tsx";
import {ImageAnalysisResponse} from "../../services/AiImageService.ts";
import {Box, TextField} from "@mui/material";

type ImageDetailsPanelProps = {
  analysis: ImageAnalysisResponse | undefined;
};

const ImageDetailsPanel = ({analysis}: ImageDetailsPanelProps) => {
  if (!analysis) {
    return <Loading label={"image analysis"}/>;
  }

  const columns = [
    {
      field: "id",
      flex: 1,
      headerName: "No.",
      headerClassName: "styledHeader"
    },
    {
      field: "observation",
      flex: 10,
      headerName: "Observation",
      headerClassName: "styledHeader"
    }
  ]

  const rows = analysis?.verboseObservations.map((observation, index) => {
    return {
      id: index + 1,
      observation: observation
    }
  })

  return (
      <Box alignContent={"flex-start"} sx={{display: "flex", flexDirection: 'column'}}>
        <Box flex={4} paddingBottom={2}>
          <DataGrid
              rows={rows}
              columns={columns}
              hideFooter
              rowSelection={false}
              showColumnVerticalBorder
              showCellVerticalBorder
          />
        </Box>
        <Box flex={1}>
          <TextField
              fullWidth
              variant={"outlined"}
              multiline
              label={"Final conclusion"}
              value={analysis?.finalConclusion}
          />
        </Box>
      </Box>
  )
}

export default ImageDetailsPanel;
