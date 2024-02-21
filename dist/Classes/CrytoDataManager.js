"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// fetch data from the alpha vantage Api 
// then store in the Db
//Class for managing text and numeric data 
var axios = require("axios");
var crytoDataManager = /** @class */ (function () {
    function crytoDataManager() {
    }
    crytoDataManager.prototype.getData = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, axios.get(url)];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.data];
                    case 2:
                        data = _a.sent();
                        return [2 /*return*/, data];
                    case 3:
                        error_1 = _a.sent();
                        console.error("error fetching data", error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    crytoDataManager.prototype.storeData = function (data) {
        console.log("storing data...");
        throw new Error("Method not implemented.");
    };
    return crytoDataManager;
}());
module.exports = crytoDataManager;
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
//# sourceMappingURL=CrytoDataManager.js.map