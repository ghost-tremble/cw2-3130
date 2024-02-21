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




async function uploadData() {
    // Create Date class so we can obtain a starting timestamp
    let date: Date = new                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                Date();
    let startTimestamp = date.getTime();

    let currencies: Array<{ name: string; averagePrice: number }> = [
        { name: "bitcoin", averagePrice: 3800 },
    ];

    // Add dummy data for four currencies
    for (let curr of currencies) {
        // Add ten lots of data for each currency
        for (let ts: number = 0; ts < 10; ++ts) {
            // Create command
            const command = new PutCommand({
                TableName: "cryto-data-numeric",
                Item: {
                    "Currency": curr.name,
                    "PriceTimeStamp": startTimestamp + ts,
                    "Price": curr.averagePrice * (1 + 0.1 * (Math.random() - 0.5))
                }
            });

            // Store data in DynamoDB and handle errors
            try {
                const response = await documentClient.send(command);
                console.log(response);
            } catch (err) {
                console.error(err);
            }
        }
    }
}

module.exports = documentClient


