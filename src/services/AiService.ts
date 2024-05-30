import http from "../http-common";

const getColors = () => {
  return http.get<Array<String>>("/colors");
};

const AiService = {
  getActivities: getColors,
};

export default AiService;