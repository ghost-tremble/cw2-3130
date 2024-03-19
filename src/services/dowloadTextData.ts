const documentClient =  require("../db/database")
const crytoDataManager = require("../Classes/crytoDataManager")
const {getUnixTimeStamp} = require("../utils/utils")
import { PutCommand} from "@aws-sdk/lib-dynamodb";



const downloadTextData = async ()=>{

    interface FeedItem {
        summary:string;
        time_published:string
    }
    interface AlphavantageNewsResult
     {
        items: string;
        feed: Array<FeedItem>;
      }
      

    const currencies =  [
        "BTC"
    ]
    const textDataManager = new crytoDataManager()

   for (var i = 0; i < currencies.length; i++){
    const url:String = `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=CRYPTO:${currencies[i]}&apikey=${process.env.ALPHAVANTAGE_API_KEY}`
    const data:AlphavantageNewsResult = await textDataManager.getData(url)
    
    if(data.feed && data.feed.length){

   // Loop through the parse Data and Save in Db  split for 500 data points per feature 
        data.feed.slice(16,20).forEach(async (item:FeedItem
            )=>{
            const command = new PutCommand({
                TableName: "CryptoTextData",
                Item: {
                    "CurrencySymbol": currencies[i],
                    "TimePublished": getUnixTimeStamp(item.time_published) ,
                    "Summary": item.summary
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


module.exports = downloadTextData





