import {useEffect, useState} from "react";
import AiImageService, {ImageInfo} from "../../services/AiImageService.ts";
import {Box, TextField} from "@mui/material";
import {Image} from "mui-image"
import Loading from "../Loading.tsx";

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
      loading ? <Loading label={"generated image"}/> :

          <Box sx={{display: "flex", flexDirection: 'row'}}>
            <Box flex={3}>
              <Image height={600} width={800} src={imageInfo?.url}/>
            </Box>
            <Box flex={2} alignContent={"center"}>
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