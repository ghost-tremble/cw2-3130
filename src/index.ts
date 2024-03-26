const dotenv = require("dotenv")
dotenv.config()


const numericData = require("./services/downloadNumericData")
const downloadTextData =  require("./services/dowloadTextData")
const {getData }= require("./Lambda/websockets/wsSingleClient/database")


// numericData()

// downloadTextData()



getData("BTC")