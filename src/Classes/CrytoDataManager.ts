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

    // TODO:
    // refactor to use the store data method 
    storeData(data: any): Promise<any> {
        console.log("storing data...")
        throw new Error("Method not implemented.");
    }

}


module.exports = crytoDataManager




