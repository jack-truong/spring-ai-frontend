import {useEffect, useState} from "react";
import ComponentStack from "../layout/ComponentStack.tsx";
import {Autocomplete, Box, Button, TextField} from "@mui/material";
import {isArrayEmpty} from "../../functions/functions.ts";
import AiStockService, {Stock} from "../../services/AiStockService.ts";
import Loading from "../Loading.tsx";
import SelectTextField from "../select/SelectTextField.tsx";

const StockControl = () => {
  const [randomize, setRandomize] = useState(0);
  const [stocks, setStocks] = useState<Array<Stock>>([]);
  const [selectedStocks, setSelectedStocks] = useState<Array<Stock>>([]);
  const [showDetails, setShowDetails] = useState(false);

  const MAX_SELECTIONS = 5;

  const getStocks = () => {
    console.log("### Loading stocks")
    AiStockService.getStocks()
    .then((response: any) => {
      setStocks(response.data);
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
          id="tags-outlined"
          onChange={(event, value) => setSelectedStocks(value)}
          getOptionDisabled={() =>
              selectedStocks.length >= MAX_SELECTIONS
          }
          options={stocks}
          getOptionLabel={(stock) => stock.symbol}
          defaultValue={[]}
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
                        onClick={() => console.log("Generate!")}
                        disabled={isArrayEmpty(selectedStocks)}
                >Generate</Button>
                <Button sx={{width: 100, textAlign: 'left'}}
                        variant="contained"
                        onClick={() => setRandomize(prev => prev + 1)}
                        disabled={isArrayEmpty(stocks)}
                >Randomize</Button>
              </Box>
            </ComponentStack>
          </Box>
          <Box flex={3}>
            {showDetails && <div>stock stuff here</div>}
          </Box>
        </Box>
      </ComponentStack>
  )
}

export default StockControl;
