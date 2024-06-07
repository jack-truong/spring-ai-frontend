import {useState} from "react";
import ComponentStack from "../layout/ComponentStack.tsx";
import {Box, Button, TextField, Typography} from "@mui/material";
import FileInput, {IMAGE_TYPES} from "../FileInput.tsx";
import {isEmpty, toBase64FromFile, toBase64FromUrl} from "../../functions/functions.ts";
import {Image} from "mui-image"
import AiImageService from "../../services/AiImageService.ts";
import ImageDetailsPanel from "./ImageDetailsPanel.tsx";

const ImageAnalysisControl = () => {
  const [image, setImage] = useState("");
  const [prompt, setPrompt] = useState("");
  const [analysis, setAnalysis] = useState(undefined);
  const [showImage, setShowImage] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const handleFile = (file: File) => {
    toBase64FromFile(file)
    .then((response: any) => {
      setImage(response);
      setShowImage(true);
    })
    .catch((e: Error) => {
      console.log(e);
    });
  }

  const handleUrl = (url: string) => {
    toBase64FromUrl(url)
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
    setShowDetails(true);

    const b64EncodedImage = image.split(',')[1]; // strip out the image type (e.g. data:image/png;base64)
    AiImageService.getImageAnalysis(prompt, b64EncodedImage)
    .then((response: any) => {
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
              <Box sx={{border: 1, padding: 2}}>
                <FileInput
                    label={"Load an image from disk"}
                    setFile={handleFile}
                    inputProps={{accept: IMAGE_TYPES}}
                />
                <Typography sx={{fontWeight: "bold", margin: 2}} align={"center"}>OR</Typography>
                <TextField
                    onChange={(event) => handleUrl(event.target.value)}
                    variant={"outlined"}
                    label={"Load an image from a URL"}
                    fullWidth
                />
              </Box>
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
