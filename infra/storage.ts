export const bucket = new sst.aws.Bucket("Uploads", {
  cors: {
    allowMethods: ["GET", "PUT"],
    allowOrigins: ["*"]

  }
});

export const secret = new sst.Secret("StripeSecretKey");

export const table = new sst.aws.Dynamo("Notes", {
  fields: {
    userId: "string",
    noteId: "string",
  },
  primaryIndex: { hashKey: "userId", rangeKey: "noteId" }
});
