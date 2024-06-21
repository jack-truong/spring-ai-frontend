import {useEffect, useState} from "react";
import ComponentStack from "../layout/ComponentStack.tsx";
import {Box, Button, TextField} from "@mui/material";
import {isEmpty} from "../../functions/functions.ts";
import {Image} from "mui-image"
import AiDbService, {DbQueryResponse} from "../../services/AiDbService.ts";
import DbResultsPanel from "./DbResultsPanel.tsx";

const DbControl = () => {
  const [query, setQuery] = useState("");
  const [image, setImage] = useState("");
  const [showImage, setShowImage] = useState(false);
  const [dbQueryResponse, setDbQueryResponse] = useState<DbQueryResponse>();
  const [showDetails, setShowDetails] = useState(false);

  const getDbSchemaImage = () => {
    console.log("### Getting db schema image");

    AiDbService.getDbSchemaImage()
    .then((response: any) => {
      // Just need to prepend any time here, browser should render it correctly
      setImage("data:image/jpg;base64," + response.data.b64Image);
      setShowImage(true);
    })
    .catch((e: Error) => {
      console.log(e);
    });
  }

  const getDbQueryResponse = (query: string) => {
    console.log("### Getting db query response: ", query);

    setDbQueryResponse(undefined);
    setShowDetails(true);

    AiDbService.getDbQueryResponse(query)
    .then((response: any) => {
      setDbQueryResponse(response.data);
    })
    .catch((e: Error) => {
      console.log(e);
    });
  }

  useEffect(() => {
    getDbSchemaImage();
  }, []);

  return (
      <ComponentStack sx={{border: 3}}>
        <Box sx={{display: "flex"}}>
          <Box flex={1}>
            <ComponentStack>
              <TextField
                  onChange={(event) => setQuery(event.target.value)}
                  variant={"outlined"}
                  label={"Ask a question about the database"}
                  multiline
              />
              <Box>
                <Button sx={{width: 100, textAlign: 'left', marginRight: 2}}
                        variant="contained"
                        onClick={() => getDbQueryResponse(query)}
                        disabled={isEmpty(query)}
                >Analyze</Button>
              </Box>
            </ComponentStack>
          </Box>
          <Box flex={4} sx={{display: "flex", flexDirection: 'row', padding: "2"}}>
            <Box flex={3}>
              {showImage && <Image height={"70%"} fit={"contain"} src={image}/>}
            </Box>
            <Box flex={2}>
              {showDetails && <DbResultsPanel query={dbQueryResponse?.query} answer={dbQueryResponse?.answer} />}
            </Box>
          </Box>
        </Box>
      </ComponentStack>
  )
}

export default DbControl;
