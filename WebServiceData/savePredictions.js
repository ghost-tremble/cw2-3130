//Import AWS
const { SageMakerRuntimeClient, InvokeEndpointCommand } =  require("@aws-sdk/client-sagemaker-runtime"); 
const { PutCommand} = require("@aws-sdk/lib-dynamodb");
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, QueryCommand } = require("@aws-sdk/lib-dynamodb");

// Create client
const clientDb = new DynamoDBClient({});
const documentClient = DynamoDBDocumentClient.from(clientDb);


//Create SageMakerRuntimeClient
const client = new SageMakerRuntimeClient({});
const getData =  require("./downloadTestData")

/* Data we are going to send to endpoint
    REPLACE WITH YOUR OWN DATA!
    Should be last 100 points in your time series (depending on your choice of hyperparameters).
    Make sure that start is correct.
*/


//Calls endpoint and logs results
 async function invokeEndpoint (endpointName,currency) {
    //Create and send command with data
    const last100Points =  await getData(currency)
   
    const command = new InvokeEndpointCommand({
        EndpointName: endpointName,
        Body: JSON.stringify(
            {
                "instances":
                  [
                    {
                      "start":last100Points.start,
                      "target":last100Points.target
                    }
                  ],
                  "configuration":
                     {
                       "num_samples": 50,
                        "output_types":["mean","quantiles","samples"],
                        "quantiles":["0.1","0.9"]
                     }
              }
            
        ),
        ContentType: "application/json",
        Accept: "application/json"
    });
    const response = await client.send(command);

    //Must install @types/node for this to work
    let predictions = JSON.parse(Buffer.from(response.Body).toString('utf8'));
let reversal = last100Points.start.replace(' ', 'T') + ".000Z"
    var date = new Date(reversal);

// Get the number of milliseconds since the Unix epoch (January 1, 1970)
 
    const startTime = date.getTime()
console.log(startTime)
console.log(last100Points.start)
let progression =  86400000
    
   for(let i = 0; i <  predictions.predictions[0].mean.length; i++){
    const command = new PutCommand({
        TableName: "CryptoExchangeRates",
        Item: {
            "CurrencySymbol": currency,
            "CrytoTs": startTime + (151+i)*progression ,
            "ExchangeRates": predictions.predictions[0].mean[i],
            "prediction" :"true"
        }
    });

    await documentClient.send(command);
   }


    //Save Predictions Mean Only and calculate Time
    return predictions
}

// invokeEndpoint("cw2-eth-endpoint","ETH");
// invokeEndpoint("cw2-xrp-endpoint","XRP");
// invokeEndpoint("cw2-ltc-endpoint","LTC");
// invokeEndpoint("cw2-doge-endpoint","DOGE");
invokeEndpoint("cw2-btc-endpoint","BTC");
