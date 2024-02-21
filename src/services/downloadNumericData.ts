const documentClient =  require("../db/database")
const crytoDataManager = require("../Classes/crytoDataManager")

const downloandNumericData = async ()=>{
    const currencies =  [
        "BTC"
    ]
    const numericDataManager = new crytoDataManager(currencies,documentClient)
let numericData =  await numericDataManager.getData()
console.log(numericData)
  
//    for (var i = 0; i < currencies.length; i++){
    

//    }

}


module.exports = downloandNumericData