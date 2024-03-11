import { useState} from "react";
import { CryptoBtn } from "./components/CryptoBtn";
import Plot from 'react-plotly.js';
import "./App.css"
function App() {
   const [activeCoin, setActiveCoin] = useState("Bitcoin")
   const  [ coinData, setCoinData] = useState({})

    let connection = new WebSocket("wss://5i1k8p4177.execute-api.us-east-1.amazonaws.com/prod");
    connection.onopen = function(event){
      console.log("Connected: " + JSON.stringify(event));
      sendMessage("BTC")
     
  };
   
    connection.onmessage = function(msg){
      const data = JSON.parse(msg.data)
      setCoinData(data)
    
    }

    connection.onerror = function (error) {
        console.log("WebSocket Error: " + JSON.stringify(error));
    }

    function sendMessage(coin){
        //Create message to be sent to server
        console.log("running")
        let msgObject = {
          action: "fetchPlotPoints",
          data: coin
        };
        connection.send(JSON.stringify(msgObject));

    }

// sentiment Traces 
// postive negative and neutral

 const positiveSentiment ={
    x:[],
    y:[]
  }

  console.log(positiveSentiment)
  const negativeSentiment = {
    x:[],
    y:[]
  }

  const neutralSentiment = {
    x:[],
    y:[]
  }

  coinData?.BTC?.sentiment.y.forEach((item, index) => {
    if (item > 0) {
        positiveSentiment.x.push(new Date (coinData?.BTC?.sentiment.x[index]));
        positiveSentiment.y.push(item);
    } else if (item < 0) {
      negativeSentiment.x.push(new Date (coinData?.BTC?.sentiment.x[index]));
      negativeSentiment.y.push(item);
    } else {
        // Assuming item === 0 is considered neutral
        neutralSentiment.x.push(new Date (coinData?.BTC?.sentiment.x[index]));
        neutralSentiment.y.push(item);
    }
});



// x is date 
// y is value

 

  


  return (
    <div className="App">
    <div className="container">
      <div>
      <CryptoBtn dbTitle="BTC" title={activeCoin} action={sendMessage} action2={setActiveCoin}/>
      <CryptoBtn title="Bitcoin" action=""/>
      <CryptoBtn title="Bitcoin" action=""/>
      <CryptoBtn title="Bitcoin" action=""/>
      </div>

      <div className="charts">
        <div>
        <h1>Showing ${activeCoin} Prices for duration X and Y </h1>
        <div className="timeseries">
          {
            coinData?.BTC &&
          
        <Plot
        data={[
          {
            x: coinData?.BTC.actual.x.map((item)=>{
              return new Date(item)
            }),
            y: coinData?.BTC.actual.y,
            // type: 'scatter',
            mode: 'lines+markers',
            marker: {color: 'red'},
          },
         
        ]}
        layout={ {width: 1000, height: 700, title: `${activeCoin}`} }
      />
      }
        </div>

        </div>

        <div className="sentiment">
<h1>
  Sentimental Analysis of {activeCoin} over time
</h1>

{
  coinData?.BTC &&

<Plot
  data={[
    {
      x: positiveSentiment.x,
      y: coinData?.BTC.sentiment.y.filter((item, index) => coinData?.BTC.sentiment.x[index] > 0),
      mode: 'lines+markers',
      marker: { color: 'green' },
      name: 'Positive Sentiment',
    },
    {
      x: coinData?.BTC.sentiment.x.map((item, index) => {
        if (coinData?.BTC.sentiment.x[index] < 0) {
          return new Date(item);
        }
      }),
      y: coinData?.BTC.sentiment.y.filter((item, index) => coinData?.BTC.sentiment.x[index] < 0),
      mode: 'markers',
      marker: { color: 'blue' },
      name: 'Negative Sentiment',
    },
    {
      x: coinData?.BTC.sentiment.x.map((item, index) => {
        if (coinData?.BTC.sentiment.x[index] === 0) {
          return new Date(item);
        }
      }),
      y: coinData?.BTC.sentiment.y.filter((item, index) => coinData?.BTC.sentiment.x[index] === 0),
      mode: 'markers',
      marker: { color: 'gray' },
      name: 'Neutral Sentiment',
    },
  ]}
  layout={{ width: 1000, height: 500, title: `${activeCoin}` }}
/>

}
        </div>
        
      </div>
 


      
    </div>
    </div>
  );
}

export default App;
