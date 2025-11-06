import { APPSYNC_API_ENDPOINT, APPSYNC_API_KEY } from "./envConfig";

const awsmobile = {
  aws_project_region: "ap-south-1",
  aws_appsync_graphqlEndpoint: APPSYNC_API_ENDPOINT,
  aws_appsync_region: "ap-south-1",
  aws_appsync_authenticationType: "API_KEY",
  aws_appsync_apiKey: APPSYNC_API_KEY,
};

export default awsmobile;
