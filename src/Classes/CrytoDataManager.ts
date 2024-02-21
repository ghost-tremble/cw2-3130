import { AxiosResponse } from "axios";

export {};
// fetch data from the alpha vantage Api 
// then store in the Db
//Class for managing text and numeric data 
const axios = require("axios")

interface DataManager{
    getData(url:string): Promise<any>;
    storeData(data: any): Promise<any>;
}

interface Params {
    [key: string]: any;
  }

class crytoDataManager implements DataManager {

 async getData(url:string): Promise<any> {
    try {
        const response: AxiosResponse = await axios.get(url);
        const data = await response.data
    return data
    } catch (error) {
        console.error("error fetching data", error)
        
    }
  
       
       
    }
    storeData(data: any): Promise<any> {
        console.log("storing data...")
        throw new Error("Method not implemented.");
    }

}


module.exports = crytoDataManager





// async function uploadData(command:any, data:object[],params:Params) {
//     // Create Date class so we can obtain a starting timestamp
//     let date: Date = new                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                Date();
//     let startTimestamp = date.getTime();

//     let currencies: Array<{ name: string; averagePrice: number }> = [
//         { name: "bitcoin", averagePrice: 3800 },
//     ];

//     // Add dummy data for four currencies
//     for (let curr of currencies) {
//         // Add ten lots of data for each currency
//         for (let ts: number = 0; ts < 10; ++ts) {
//             // Create command
//             const command = new PutCommand({
//                 TableName: "cryto-data-numeric",
//                 Item: {
//                     "Currency": curr.name,
//                     "PriceTimeStamp": startTimestamp + ts,
//                     "Price": curr.averagePrice * (1 + 0.1 * (Math.random() - 0.5))
//                 }
//             });

//             // Store data in DynamoDB and handle errors
//             try {
//                 const response = await documentClient.send(command);
//                 console.log(response);
//             } catch (err) {
//                 console.error(err);
//             }
//         }
//     }
// }