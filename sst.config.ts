/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "notes",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
    };
  },
  async run() {
    await import("./infra/storage");
    const api = await import("./infra/api");
    const auth = await import("./infra/auth");

    return {
      IdentityPool: auth.identityPool.id,
      UserPoolClient: auth.userPoolClient.id,
      UserPool: auth.userPool.id,
      api: api.api.url,
      Region: aws.getRegionOutput().name
    };
  },
});
