import {useState} from "react";
import ComponentStack from "../layout/ComponentStack.tsx";
import {Box, Button, TextField} from "@mui/material";
import FileInput, {IMAGE_TYPES} from "../FileInput.tsx";
import {isEmpty, toBase64} from "../../functions/functions.ts";
import {Image} from "mui-image"
import AiImageService, {ImageAnalysisResponse} from "../../services/AiImageService.ts";
import ImageDetailsPanel from "./ImageDetailsPanel.tsx";

const ImageAnalysisControl = () => {
  const [image, setImage] = useState("");
  const [prompt, setPrompt] = useState("");
  const [analysis, setAnalysis] = useState<ImageAnalysisResponse>();
  const [showImage, setShowImage] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const handleFile = (file: File) => {
    toBase64(file)
    .then((response: any) => {
      setImage(response);
      setShowImage(true);
    })
    .catch((e: Error) => {
      console.log(e);
    });
  }

  const getImageAnalysis = () => {
    console.log("### Getting image analysis: ", prompt);
    setAnalysis(undefined);

    const b64EncodedImage = image.split(',')[1]; // strip out the image type (e.g. data:image/png;base64)
    AiImageService.getImageAnalysis(prompt, b64EncodedImage)
    .then((response: any) => {
      setShowDetails(true);
      setAnalysis(response.data);
    })
    .catch((e: Error) => {
      console.log(e);
    });
  }

  return (
      <ComponentStack sx={{border: 3}}>
        <Box sx={{display: "flex"}}>
          <Box flex={1}>
            <ComponentStack>
              <FileInput
                  label={"Select an image"}
                  setFile={handleFile}
                  inputProps={{accept: IMAGE_TYPES}}
              />
              <TextField
                  onChange={(event) => setPrompt(event.target.value)}
                  variant={"outlined"}
                  label={"Ask a question about the image"}
                  multiline
              />
              <Box>
                <Button sx={{width: 100, textAlign: 'left', marginRight: 2}}
                        variant="contained"
                        onClick={getImageAnalysis}
                        disabled={isEmpty(image) || isEmpty(prompt)}
                >Analyze</Button>
              </Box>
            </ComponentStack>
          </Box>
          <Box flex={4} sx={{display: "flex", flexDirection: 'row', padding: "2"}}>
            <Box flex={3}>
              {showImage && <Image height={"70%"} fit={"contain"} src={image}/>}
            </Box>
            <Box flex={2}>
              {showDetails && <ImageDetailsPanel analysis={analysis}/>}
            </Box>
          </Box>
        </Box>
      </ComponentStack>
  )
}

export default ImageAnalysisControl;
