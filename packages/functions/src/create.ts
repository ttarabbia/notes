import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb"
import * as uuid from "uuid";
import { APIGatewayProxyEvent } from 'aws-lambda';
import { Util } from "@notes/core/util"
import { Resource } from 'sst';

const dynamoDb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const main = Util.handler(async (event) => {
  let data = {
    content: "",
    attachment: "",
  };

  if (event.body != null) {
    data = JSON.parse(event.body);
  }

  const params = {
    TableName: Resource.Notes.name,
    Item: {
      userId: "123",
      noteId: uuid.v1(),
      content: data.content,
      attachment: data.attachment,
      createdAt: Date.now(),

    }
  };

  await dynamoDb.send(new PutCommand(params));
  return JSON.stringify(params.Item);
})

