var dotenv = require("dotenv");
dotenv.config();
var numericData = require("./services/downloadNumericData");
var downloadTextData = require("./services/dowloadTextData");
var getData = require("./Lambda/websockets/wsSingleClient/database").getData;
// numericData()
// downloadTextData()
getData("ETH");
//# sourceMappingURL=index.js.map