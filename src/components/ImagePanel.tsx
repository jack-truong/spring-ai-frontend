import {useEffect, useState} from "react";
import AiImageService, {ImageInfo} from "../services/AiImageService.ts";
import {CircularProgress} from "@mui/material";

type ImagePanelProps = {
  prompt: string;
};

const ImagePanel = ({prompt}: ImagePanelProps) => {
  const [loading, setLoading] = useState(false);
  const [imageInfo, setImageInfo] = useState<ImageInfo>();

  const retrieveImage = () => {
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
  };
  useEffect(() => {
    retrieveImage();
  }, [prompt]);

  return (
    loading ? <CircularProgress/> :
        <div>{`Image: ${imageInfo}`}</div>
  );
}

export default ImagePanel;