import {useEffect, useState} from "react";
import ComponentStack from "../layout/ComponentStack.tsx";
import {Autocomplete, Box, Button} from "@mui/material";
import {getRandomElements, isArrayEmpty} from "../../functions/functions.ts";
import {Stock, StockRecommendation} from "../../services/AiStockService.ts";
import Loading from "../Loading.tsx";
import SelectTextField from "../select/SelectTextField.tsx";
import StockGainsPanel from "./StockGainsPanel.tsx";

const StockControl = () => {
  const [stocks, setStocks] = useState<Array<Stock>>([]);
  const [selectedStocks, setSelectedStocks] = useState<Array<Stock>>([]);
  const [historicalGains, setHistoricalGains] = useState<StockRecommendation>();
  const [showDetails, setShowDetails] = useState(false);

  const MAX_SELECTIONS = 5;

  const randomizeStocks = (stocks: Array<Stock>) => {
    setSelectedStocks(getRandomElements(stocks, MAX_SELECTIONS));
  }

  const fakeStocks = [
    {
      "symbol": "AMD",
      "company": "Advanced Micro Devices"
    },
    {
      "symbol": "GOOGL",
      "company": "Alphabet Inc."
    },
    {
      "symbol": "AMZN",
      "company": "Amazon.com Inc."
    },
    {
      "symbol": "AAPL",
      "company": "Apple Inc."
    },
    {
      "symbol": "BAC",
      "company": "Bank of America"
    },
    {
      "symbol": "BA",
      "company": "Boeing Co."
    },
    {
      "symbol": "CAT",
      "company": "Caterpillar Inc."
    },
    {
      "symbol": "CVX",
      "company": "Chevron Corporation"
    },
    {
      "symbol": "DOGE",
      "company": "Dogecoin"
    },
    {
      "symbol": "F",
      "company": "Ford Motor Company"
    },
    {
      "symbol": "GE",
      "company": "General Electric"
    },
    {
      "symbol": "HD",
      "company": "Home Depot"
    },
    {
      "symbol": "INTC",
      "company": "Intel Corporation"
    },
    {
      "symbol": "IBM",
      "company": "International Business Machines"
    },
    {
      "symbol": "JNJ",
      "company": "Johnson & Johnson"
    },
    {
      "symbol": "JPM",
      "company": "JPMorgan Chase & Co."
    },
    {
      "symbol": "MSFT",
      "company": "Microsoft Corporation"
    },
    {
      "symbol": "NFLX",
      "company": "Netflix, Inc."
    },
    {
      "symbol": "NVDA",
      "company": "NVIDIA Corporation"
    },
    {
      "symbol": "PFE",
      "company": "Pfizer Inc."
    },
    {
      "symbol": "PG",
      "company": "Procter & Gamble"
    },
    {
      "symbol": "TSLA",
      "company": "Tesla, Inc."
    },
    {
      "symbol": "KO",
      "company": "The Coca-Cola Company"
    },
    {
      "symbol": "WMT",
      "company": "Walmart Inc."
    },
    {
      "symbol": "DIS",
      "company": "Walt Disney Co."
    }
  ];

  const getStocks = () => {
    console.log("### Loading stocks");

    setStocks(fakeStocks);
    randomizeStocks(fakeStocks);

    // AiStockService.getStocks()
    // .then((response: any) => {
    //   setStocks(response.data);
    //   randomizeStocks(response.data);
    // })
    // .catch((e: Error) => {
    //   console.log(e);
    // });
  }

  const fakeHistorical : StockRecommendation = {
    "values": [
      {
        "percentageGain": 5.89,
        "stockEnd": {
          "close": 633.79,
          "date": "2024-06-03"
        },
        "stockStart": {
          "close": 598.5,
          "date": "2024-03-05"
        },
        "symbol": "NFLX"
      },
      {
        "percentageGain": 12.38,
        "stockEnd": {
          "close": 29.31,
          "date": "2024-06-03"
        },
        "stockStart": {
          "close": 26.08,
          "date": "2024-03-05"
        },
        "symbol": "PFE"
      },
      {
        "percentageGain": -7.72,
        "stockEnd": {
          "close": 57.94,
          "date": "2024-06-03"
        },
        "stockStart": {
          "close": 62.79,
          "date": "2024-03-05"
        },
        "symbol": "ROKU"
      }
    ],
    "verboseRecommendation": "Based on the historical data from the past 90 days, PFE (Pfizer) shows the highest percentage gain of 12.38%. NFLX (Netflix) also experienced a positive gain of 5.89%, whereas ROKU (Roku) had a negative performance with a percentage loss of -7.72%. Therefore, I recommend buying PFE (Pfizer) stock as it had the highest gain during this period."
  }

  const getHistoricalGains = () => {
    console.log("### Loading historical gains");
    setShowDetails(true);


    setTimeout(() => setHistoricalGains(fakeHistorical), 2000)

    // const symbols = selectedStocks.map((stock) => stock.symbol);
    // AiStockService.getHistoricalGains(symbols, 30)
    // .then((response: any) => {
    //   console.log(`### Got historical data: ${JSON.stringify(response.data)}`);
    //   setShowDetails(true);
    //   setHistoricalGains(response.data);
    // })
    // .catch((e: Error) => {
    //   console.log(e);
    // });
  }

  useEffect(() => {
    getStocks();
  }, []);

  const stocksSelector = isArrayEmpty(stocks) ?
      <Loading label={"stocks"} /> :
      <Autocomplete
          multiple
          id="stocks-select"
          autoHighlight
          onChange={(event, value) => setSelectedStocks(value)}
          getOptionDisabled={() =>
              selectedStocks.length >= MAX_SELECTIONS
          }
          options={stocks}
          value={selectedStocks}
          getOptionLabel={(stock) => `${stock.symbol} - (${stock.company})`}
          filterSelectedOptions
          renderInput={(params) => (
            <SelectTextField params={params} label={"Select up to 5 stocks"}/>
          )}
      />

  return (
      <ComponentStack sx={{border: 3}}>
        <Box sx={{display: "flex"}}>
          <Box flex={1}>
            <ComponentStack>
              {stocksSelector}
              <Box>
                <Button sx={{width: 100, textAlign: 'left', marginRight: 2}}
                        variant="contained"
                        onClick={getHistoricalGains}
                        disabled={isArrayEmpty(selectedStocks)}
                >Generate</Button>
                <Button sx={{width: 100, textAlign: 'left'}}
                        variant="contained"
                        onClick={() => randomizeStocks(stocks)}
                        disabled={isArrayEmpty(stocks)}
                >Randomize</Button>
              </Box>
            </ComponentStack>
          </Box>
          <Box flex={3}>
            {showDetails && <StockGainsPanel stockRecommendation={historicalGains}/>}
          </Box>
        </Box>
      </ComponentStack>
  )
}

export default StockControl;
