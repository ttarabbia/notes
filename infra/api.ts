import { bucket, table } from "./storage";

export const api = new sst.aws.ApiGatewayV2("Api", {
  transform: {
    route: {
      handler: {
        link: [table],
      }
    }
  }
});

api.route("POST /notes", "packages/functions/src/create.main")
api.route("GET /notes/{id}", "packages/functions/src/get.main")
api.route("GET /notes", "packages/functions/src/list.main")
