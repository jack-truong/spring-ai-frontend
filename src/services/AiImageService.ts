import http from "../http-common";

export type ImageInfo = {
  b64Json: string;
  finalPrompt: string;
  url: string;
}

export type ImageAnalysisResponse = {
  verboseObservations: Array<string>;
  finalConclusion: string;
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

const getImageAnalysis = (prompt: string, b64EncodedImage: string) => {
  return http.post<ImageAnalysisResponse>("/image/analysis",
      {
        prompt: prompt,
        b64Json: b64EncodedImage
      }
  );
};

const AiImageService = {
  getImage: getImage,
  getImageAnalysis: getImageAnalysis
};

export default AiImageService;
