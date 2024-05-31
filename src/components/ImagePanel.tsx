import {useEffect, useState} from "react";
import AiImageService, {ImageInfo} from "../services/AiImageService.ts";
import {Box, CircularProgress, TextField} from "@mui/material";
import { Image } from 'mui-image'

type ImagePanelProps = {
  prompt: string;
};

const ImagePanel = ({prompt}: ImagePanelProps) => {
  const [loading, setLoading] = useState(false);
  const [imageInfo, setImageInfo] = useState<ImageInfo>();

  const retrieveImage = () => {
    if (prompt) {
      console.log(`### Loading image: ${prompt}`);
      setLoading(true);
      AiImageService.getImage(prompt)
      .then((response: any) => {
        setImageInfo(response.data);
        setLoading(false);
        console.log(`### Image returned: ${JSON.stringify(response.data)}`);
      })
      .catch((e: Error) => {
        console.log(e);
      });
    }
  };
  useEffect(() => {
    retrieveImage();
  }, [prompt]);

  return (
      loading ? <CircularProgress/> :

          <Box sx={{display: "flex", flexDirection: 'column'}}>
            <Box flex={3} sx={{paddingBottom: 3}}>
              <Image height={500} width={500} src={imageInfo?.url}/>
            </Box>
            <Box flex={1}>
              <TextField
                  label={"Narrative"}
                  multiline
                  maxRows={Infinity}
                  variant={"outlined"}
                  sx={{width: "100%"}}
                  value={imageInfo?.finalPrompt}
              />
            </Box>
          </Box>
  );
}

export default ImagePanel;