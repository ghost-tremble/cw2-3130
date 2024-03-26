const fs = require('fs');
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, QueryCommand } = require("@aws-sdk/lib-dynamodb");

// Create client
const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

// Function to fetch data from DynamoDB
async function getData(coin) {
    const queries = {
        priceQuery: {
            TableName: "CryptoExchangeRates",
            Limit: 500,
            ScanIndexForward: true,
            KeyConditionExpression: "CurrencySymbol = :curr",
            ExpressionAttributeValues: {
                ":curr": coin
            },
        }
    }

    try {
        const exchangeQuery = new QueryCommand(queries.priceQuery);
        const rawExchangeData = await docClient.send(exchangeQuery);

        console.log(rawExchangeData)

        // Write data to a JSON file
        const fileName = `./${coin}/${coin}.json`;
        let target = []
        for (let i = 0; i < rawExchangeData.Items.length; i++) {
            target.push(rawExchangeData.Items[i].ExchangeRates)
        }
        let start =  new Date(rawExchangeData.Items[0].CrytoTs)
        console.log(start)
        let allData =  {
            start:start.toISOString().replace('T', ' ').replace(/\.\d+Z$/, ''),
            target:target
        }
        fs.writeFileSync(fileName, JSON.stringify(allData));
        console.log(`Data saved to ${fileName}`);
    } catch (err) {
        console.log(err);
    }
}

// getData("BTC"); 
// getData("DOGE");
getData("ETH");
// getData("LTC");
// getData("XRP");