import http from "../http-common";

const getActivities = () => {
  return http.get<Array<String>>("/activities");
};

const getColors = () => {
  return http.get<Array<String>>("/colors");
};

const getEnvironments = () => {
  return http.get<Array<String>>("/environments");
};

const getFoods = () => {
  return http.get<Array<String>>("/foods");
};

const getInstruments = () => {
  return http.get<Array<String>>("/instruments");
};

const AiChatService = {
  getActivities: getActivities,
  getColors: getColors,
  getEnvironments: getEnvironments,
  getFoods: getFoods,
  getInstruments: getInstruments,
};

export default AiChatService;