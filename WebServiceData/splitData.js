const fs = require('fs');

async function splitData(coin,folder, trainRatio = 0.70,) {
    try {
        const data = require(`./${folder}/${folder}.json`);
        const trainFile = `./${folder}/${coin}_train.json`;
const testFile = `./${folder}/${coin}_test.json`;

        const totalData = data.target.length;

        const trainSize = Math.ceil(totalData * trainRatio);

        const trainData = data.target.slice(0, trainSize);
       
        const testData = data.target.slice(trainSize);
        console.log(trainData.length)
        console.log(testData.length)

        // Save train data to train.json

      
        fs.writeFileSync(trainFile, JSON.stringify({...data,target:trainData}, null, 4));

        // Save test data to test.json
        fs.writeFileSync(testFile, JSON.stringify({...data,target:testData}, null, 4));

        console.log('Data has been successfully saved.');
    } catch (error) {
        console.error('Error:', error.message);
    }
}

// Example usage:



// Example data (replace this with your actual data)
 // Load your JSON data here

// Convert JSON string to JavaScript object using JSON.parse()


splitData("ltc","LTC");
splitData("eth","ETH");
splitData("btc","BTC");
splitData("xrp","XRP");
splitData("doge","DOGE");

