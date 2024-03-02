"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var documentClient = require("./db/database");
var dotenv = require("dotenv");
dotenv.config();
var numericData = require("./services/downloadNumericData");
var downloadTextData = require("./services/dowloadTextData");
numericData();
// downloadTextData()
//# sourceMappingURL=index.js.map