//Import library and scan command
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand, DeleteCommand ,QueryCommand} from "@aws-sdk/lib-dynamodb";

//Create client
const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

//Returns all of the connection IDs
export async function getConnectionIds() {
    const scanCommand = new ScanCommand({
        TableName: "WebSocketClients"
    });
    
    const response  = await docClient.send(scanCommand);
    return response.Items;
};


export async function getData(coin){
    const queries= {
        // Prices With Predictions
        priceQuery: {
            TableName: "CryptoExchangeRates",
            Limit: 200,
            ScanIndexForward: false,
            KeyConditionExpression: "CurrencySymbol = :curr",
            ExpressionAttributeValues: {
                ":curr": coin
            },
        }
        
        
        ,
        sentimentQuery:{
            TableName: "Sentiment",
            Limit: 50,
            ScanIndexForward: true,
            KeyConditionExpression: "CurrencySymbol = :curr",
            ExpressionAttributeValues: {
              ":curr": coin
            },
            SortKeyCondition: "TimePublished" 
        },
       
    }

    try{
  const exhangeQuery = new QueryCommand(queries.priceQuery);

  const sentimentQuery = new QueryCommand(queries.sentimentQuery);
  

        let rawExchangeData = await docClient.send(exhangeQuery);
        let rawSentimentData = await docClient.send(sentimentQuery)
        
       
    
        let sentimentXaxis =  []
        let sentimentYaxis = []
        let exchangeXaxis = []
        let exchangeYaxis = []

        let predictionXaxis = []
        let predictionYaxis = []

       await rawSentimentData?.Items.forEach(item => {  
           sentimentYaxis.push(item.Sentiment)
           sentimentXaxis.push(item.TimePublished)
                    
        });

      

        await rawExchangeData?.Items.reverse().forEach(item => {  
            
            exchangeYaxis.push(item.ExchangeRates)
            exchangeXaxis.push(item.CrytoTs)

            if(item.prediction == 'true'){
                
                                predictionYaxis.push(item.ExchangeRates)
                predictionXaxis.push(item.CrytoTs)
            }
                     
         });

        
       

        let formattedData = {
          [`${coin}`] : {
            actual:{
                x:exchangeXaxis,
                y:exchangeYaxis
            },
            predition:{
                x:predictionXaxis,
                y:predictionYaxis
            },
            sentiment:{
                x: sentimentXaxis,
                y: sentimentYaxis
            }
        }
        }

         return formattedData
      
    }
    catch(err){
      console.log(err)
    }



}







//Deletes the specified connection ID
export async function deleteConnectionId(connectionId){
    console.log("Deleting connection Id: " + connectionId);

    const deleteCommand = new DeleteCommand ({
        TableName: "WebSocketClients",
        Key: {
            ConnectionIds: connectionId
        }
    });
    return docClient.send(deleteCommand);
};