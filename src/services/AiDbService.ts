import http from "../http-common";

export type DbSchemaImageResponse = {
  b64Image: string;
}

export type DbQueryResponse = {
  query: string;
  answer: string;
}

const getDbSchemaImage = () => {
  return http.get<DbSchemaImageResponse>("/db/schema-image");
};

const getDbQueryResponse = (query: string) => {
  return http.get<DbQueryResponse>("/db/query",
      {
        params: {
          query: query
        },
      }
  );
};

const AiDbService = {
  getDbSchemaImage: getDbSchemaImage,
  getDbQueryResponse: getDbQueryResponse
};

export default AiDbService;
