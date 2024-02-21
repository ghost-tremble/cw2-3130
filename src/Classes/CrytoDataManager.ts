export {};
// fetch data from the alpha vantage Api 
// then store in the Db
//Class for managing text and numeric data 
const axios = require("axios")

interface DataManager{
    getData(): Promise<any>;
    storeData(data: any): Promise<any>;
}


class crytoDataManager implements DataManager {
    private currencies : string[];
    private database : any

    constructor(currencies : string[], database:any){
        this.currencies = currencies
        this.database = database
    }


   async getData(): Promise<any> {
const data =  await axios.get("https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=BTC&market=USD&apikey=PHY1E3XEIL2WXMLO");
console.log(data.length)
return data
       
       
    }
    storeData(data: any): Promise<any> {
        console.log("storing data...")
        throw new Error("Method not implemented.");
    }

}


module.exports = crytoDataManager