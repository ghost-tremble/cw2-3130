const fs = require('fs');
const axios = require('axios');

async function pullAndSaveData(url, trainFile, testFile, trainRatio = 0.85,mainFile="synthetic.json") {
    try {
        // Pull data from the web service
        const response = await axios.get(url);
      
        const data = response.data;
        const totalData = data.target.length;
        console.log(totalData);

        
        const trainSize = Math.ceil(totalData * trainRatio);

        const trainData = data.target.slice(0, trainSize);
       
        const testData = data.target.slice(trainSize);

        // Save train data to train.json

        fs.writeFileSync(mainFile, JSON.stringify(data, null, 4));
        fs.writeFileSync(trainFile, JSON.stringify({...data,target:trainData}, null, 4));

        // Save test data to test.json
        fs.writeFileSync(testFile, JSON.stringify({...data,target:testData}, null, 4));

        console.log('Data has been successfully saved.');
    } catch (error) {
        console.error('Error:', error.message);
    }
}

// Example usage:
const url = 'https://y2gtfx0jg3.execute-api.us-east-1.amazonaws.com/prod/M00949037';
const trainFile = 'train.json';
const testFile = 'test.json';
pullAndSaveData(url, trainFile, testFile);
