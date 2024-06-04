import {useEffect, useState} from "react";
import ComponentStack from "../layout/ComponentStack.tsx";
import {Autocomplete, Box, Button} from "@mui/material";
import {getRandomElements, isArrayEmpty} from "../../functions/functions.ts";
import AiStockService, {Stock, StockRecommendation} from "../../services/AiStockService.ts";
import Loading from "../Loading.tsx";
import SelectTextField from "../select/SelectTextField.tsx";
import StockGainsPanel from "./StockGainsPanel.tsx";

const TIMEFRAME_VALUES = [
  {
    value: 30,
    label: "30 days"
  },
  {
    value: 60,
    label: "60 days"
  },
  {
    value: 90,
    label: "90 days"
  },
  {
    value: 120,
    label: "120 days"
  }
]

const StockControl = () => {
  const [stocks, setStocks] = useState<Array<Stock>>([]);
  const [selectedStocks, setSelectedStocks] = useState<Array<Stock>>([]);
  const [timeframe, setTimeframe] = useState(TIMEFRAME_VALUES[0]);
  const [historicalGains, setHistoricalGains] = useState<StockRecommendation>();
  const [showDetails, setShowDetails] = useState(false);

  const MAX_SELECTIONS = 5;

  const randomizeStocks = (stocks: Array<Stock>) => {
    setSelectedStocks(getRandomElements(stocks, MAX_SELECTIONS));
  }

  const getStocks = () => {
    console.log("### Loading stocks");

    AiStockService.getStocks()
    .then((response: any) => {
      setStocks(response.data);
      randomizeStocks(response.data);
    })
    .catch((e: Error) => {
      console.log(e);
    });
  }

  const getHistoricalGains = () => {
    console.log("### Loading historical gains");

    setShowDetails(true);
    const symbols = selectedStocks.map((stock) => stock.symbol);
    AiStockService.getHistoricalGains(symbols, timeframe.value)
    .then((response: any) => {
      setHistoricalGains(response.data);
    })
    .catch((e: Error) => {
      console.log(e);
    });
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

  const timeframeSelector = <Autocomplete
      id="auto-highlight"
      autoHighlight
      onChange={(event, newValue) => {
        setTimeframe(newValue)
      }}
      options={TIMEFRAME_VALUES}
      value={timeframe}
      renderInput={(params) => (
          <SelectTextField params={params} label={"Select a timeframe"}/>
      )}
  />

  return (
      <ComponentStack sx={{border: 3}}>
        <Box sx={{display: "flex"}}>
          <Box flex={1}>
            <ComponentStack>
              {stocksSelector}
              {timeframeSelector}
              <Box>
                <Button sx={{width: 100, textAlign: 'left', marginRight: 2}}
                        variant="contained"
                        onClick={getHistoricalGains}
                        disabled={isArrayEmpty(selectedStocks) || !timeframe}
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
