import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DeleteCommand, DeleteCommandInput, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { Util } from "@notes/core/util";
import { Resource } from "sst";

const dynamoDb = DynamoDBDocumentClient.from(new DynamoDBClient({}))

export const main = Util.handler(async (event, context) => {
  const noteId = event?.pathParameters?.id;
  const params: DeleteCommandInput = {
    TableName: Resource.Notes.name,
    Key: {
      userId: "123",
      noteId
    },
  };
  // console.log("event: ", event);
  // console.log("context: ", context);

  await dynamoDb.send(new DeleteCommand(params));

  return JSON.stringify({ status: true, noteId })
})
