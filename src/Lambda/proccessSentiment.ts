// sentiment code goes here

import axios from "axios";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";



let awsConfig = {
    region: "us-east-1",
    endpoint: "https://dynamodb.us-east-1.amazonaws.com"
};




// Create new DocumentClient
const client = new DynamoDBClient({ region: awsConfig.region });
export const documentClient = DynamoDBDocumentClient.from(client);



export const handler = async (event) => {
    // console.log(JSON.stringify(event));
    
    for (let record of event.Records) {
        if (record.eventName === "INSERT") {
            const currency = record.dynamodb.NewImage.CurrencySymbol.S;
            const summary = record.dynamodb.NewImage.Summary.S;  
            const timeStamp = record.dynamodb.NewImage.TimePublished.N;
            
            // Get Sentiment of Text

            let url = 'https://kmqvzxr68e.execute-api.us-east-1.amazonaws.com/prod';

            try {
                let response = await axios.post(
                    url,
                    {
                        text: summary
                    },
                );
              let sentiment = await response.data.sentiment
              const command = new PutCommand({
                TableName: "Sentiment",
                Item: {
                    "CurrencySymbol": currency,
                    "TimePublished": Number(timeStamp),
                    "Sentiment": sentiment
                }
            });

                await documentClient.send(command);
            

                
            } catch (error) {
                console.error(error);
            }
        }
    }
};