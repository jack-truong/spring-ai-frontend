import ComponentStack from "../layout/ComponentStack.tsx";
import {Box, TextField} from "@mui/material";
import {format} from "sql-formatter";
import Loading from "../Loading.tsx";

type DbResultsPanelProps = {
  query: string | undefined;
  answer: string | undefined;
}

const DbResultsPanel = ({query, answer}: DbResultsPanelProps) => {
  return (
      !query ? <Loading label={"query results"}></Loading> :
          <ComponentStack>
            <Box sx={{display: "flex"}}>
              <Box flex={5}>
                <TextField
                    variant={"outlined"}
                    label={"Generated Query"}
                    multiline
                    value={format(query)}
                />
              </Box>
              <Box flex={3}>
                <TextField
                    variant={"outlined"}
                    label={"Answer"}
                    multiline
                    value={answer}
                />
              </Box>
            </Box>
          </ComponentStack>
  )
}

export default DbResultsPanel;
