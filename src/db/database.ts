import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

// Use AWS SDK v3 for DynamoDB and remove the AWS SDK v2 import
// const AWS = require("aws-sdk"); // Remove this line

let awsConfig = {
    region: "us-east-1",
    // Update the endpoint to the correct format
    endpoint: "https://dynamodb.us-east-1.amazonaws.com"
};

// Needed here 
// Function that saves sentiment text data 
// function that saves numeric data





// Create new DocumentClient
const client = new DynamoDBClient({ region: awsConfig.region });
const documentClient = DynamoDBDocumentClient.from(client);





module.exports = documentClient


