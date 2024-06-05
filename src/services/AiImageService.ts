import http from "../http-common";

export type ImageInfo = {
  b64Json: string;
  finalPrompt: string;
  url: string;
}
const getImage = (prompt: string) => {
  return http.get<ImageInfo>("/image/creation",
      {
        params: {
          prompt: prompt
        }
      }
  );
};

const AiImageService = {
  getImage: getImage
};

export default AiImageService;
