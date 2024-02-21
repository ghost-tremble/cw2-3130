"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
var lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
// Use AWS SDK v3 for DynamoDB and remove the AWS SDK v2 import
// const AWS = require("aws-sdk"); // Remove this line
var awsConfig = {
    region: "us-east-1",
    // Update the endpoint to the correct format
    endpoint: "https://dynamodb.us-east-1.amazonaws.com"
};
// Needed here 
// Function that saves sentiment text data 
// function that saves numeric data
// Create new DocumentClient
var client = new client_dynamodb_1.DynamoDBClient({ region: awsConfig.region });
var documentClient = lib_dynamodb_1.DynamoDBDocumentClient.from(client);
module.exports = documentClient;
//# sourceMappingURL=database.js.map