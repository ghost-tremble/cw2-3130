import { useState} from "react";
import { CryptoBtn } from "./components/CryptoBtn";
import Plot from 'react-plotly.js';
import "./App.css"

function App() {
  const [activeCoin, setActiveCoin] = useState("Bitcoin");
  const [coinData, setCoinData] = useState({});

  let connection = new WebSocket("wss://oa4yaqfqw1.execute-api.us-east-1.amazonaws.com/prod");
  connection.onopen = function(event){
    sendMessage("ETH");
  };

  connection.onmessage = function(msg){
    const data = JSON.parse(msg.data);
    setCoinData(data);
  };

  function sendMessage(coin){
    alert(coin)
    let msgObject = {
      action: "fetchPlotPoints",
      data: coin
    };
    connection.send(JSON.stringify(msgObject));
  }

  let positivePercentage = 0;
  let negativePercentage = 0;
  let neutralPercentage = 0;

  if (coinData?.BTC?.sentiment) {
    const totalSentimentCount = coinData.BTC.sentiment.y.length;
    const positiveCount = coinData.BTC.sentiment.y.filter(item => item > 0).length;
    const negativeCount = coinData.BTC.sentiment.y.filter(item => item < 0).length;
    const neutralCount = totalSentimentCount - positiveCount - negativeCount;

    positivePercentage = (positiveCount / totalSentimentCount) * 100;
    negativePercentage = (negativeCount / totalSentimentCount) * 100;
    neutralPercentage = (neutralCount / totalSentimentCount) * 100;
  }

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
              {coinData?.BTC &&
                <Plot
                  data={[
                    {
                      x: coinData.BTC.actual.x.map(item => new Date(item)),
                      y: coinData.BTC.actual.y,
                      mode: 'lines+markers',
                      marker: {color: 'red'},
                    }
                  ]}
                  layout={{width: 1000, height: 700, title: `${activeCoin}`} }
                />
              }
            </div>
          </div>

          <div className="sentiment">
            <h1>Sentimental Analysis of {activeCoin} over time</h1>

            <Plot
              data={[
                {
                  values: [positivePercentage, negativePercentage, neutralPercentage],
                  labels: ['Positive', 'Negative', 'Neutral'],
                  type: 'pie'
                }
              ]}
              layout={{ width: 1000, height: 500, title: `${activeCoin} Sentiment Analysis` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
