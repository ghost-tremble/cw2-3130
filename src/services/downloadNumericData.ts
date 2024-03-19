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
    const url:String = `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=${currencies[i]}&market=USD&apikey=${process.env.ALPHAVANTAGE_API_KEY}`
    const data:Object = await numericDataManager.getData(url)
    const parseDataForDb:object[] = processData(data)
    if(parseDataForDb.length > 0){

   // Loop through the parse Data and Save in Db  split for 500 data points per feature 
        parseDataForDb.slice(0,5).forEach(async (item:AlphavantageCrypto
            )=>{
            const command = new PutCommand({
                TableName: "CryptoExchangeRates",
                Item: {
                    "CurrencySymbol": currencies[i],
                    "CrytoTs": item.date,
                    "ExchangeRates": item.closingPrice
                }
            });

            try {
                const response = await documentClient.send(command);
                // console.log(response);
            } catch (err) {
                console.error(err);
            }
            
        })
    }
    

 
    

   }

}


module.exports = downloandNumericData

