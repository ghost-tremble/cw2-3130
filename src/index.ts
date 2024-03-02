const dotenv = require("dotenv")
dotenv.config()


const numericData = require("./services/downloadNumericData")
const downloadTextData =  require("./services/dowloadTextData")

numericData()

// downloadTextData()






