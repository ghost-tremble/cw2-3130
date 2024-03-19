"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = require("dotenv");
dotenv.config();
var numericData = require("./services/downloadNumericData");
var downloadTextData = require("./services/dowloadTextData");
// numericData()
// downloadTextData()
var database_1 = require("./Lambda/websockets/wsSingleClient/database");
(0, database_1.getData)("BTC");
//# sourceMappingURL=index.js.map