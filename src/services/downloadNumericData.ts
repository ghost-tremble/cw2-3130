const documentClient =  require("../db/database")
const crytoDataManager = require("../Classes/crytoDataManager")
const {processData} = require("../utils/utils")
import { PutCommand} from "@aws-sdk/lib-dynamodb";



const downloandNumericData = async ()=>{
    interface AlphavantageCrypto
     {
        name: string;
        date:Date;
        closingPrice: number;
      }
      

    const currencies =  [
        "BTC"
    ]
    const numericDataManager = new crytoDataManager()
   for (var i = 0; i < currencies.length; i++){
    const url:String = ` https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=${currencies[i]}&market=USD&apikey=${process.env.ALPHAVANTAGE_API_KEY}`
    const data:Object = await numericDataManager.getData(url)
    const parseDataForDb:object[] = processData(data)
    if(parseDataForDb.length > 0){

   // Loop through the parse Data and Save in Db  split for 500 data points per feature 
        parseDataForDb.slice(0,5).map(async (item:AlphavantageCrypto
            )=>{
            const command = new PutCommand({
                TableName: "CrytoExchangeRates",
                Item: {
                    "CurrencySymbol": currencies[i],
                    "CrytoTs": item.date,
                    "ExchangeRates": item.closingPrice
                }
            });

            try {
                const response = await documentClient.send(command);
                console.log(response);
            } catch (err) {
                console.error(err);
            }
            
        })
    }
    

 
    

   }

}


module.exports = downloandNumericData



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
          
        }
    }
}
