import http from "../http-common";

export type Stock = {
  symbol: string;
  company: string;
};

type StockValue = {
  date: string;
  close: number;
};

export type StockHistorical = {
  symbol: string;
  historical: Array<StockValue>;
};

export type StockGain = {
  symbol: string;
  stockStart: StockValue;
  stockMiddle: StockValue;
  stockEnd: StockValue;
  percentageGain: number;
};

export type StockRecommendation = {
  verboseRecommendation: string;
  values: Array<StockGain>;
};

const getStocks = () => {
  return http.get<Array<Stock>>("/stock/stocks");
};

const getHistorical = (symbol: string, numberOfDays: number) => {
  return http.get<StockHistorical>(`/stock/historical/${symbol}`,
      {
        params: {
          numberOfDays: numberOfDays
        },
      }
  );
};

const getHistoricalGains = (symbols: Array<string>, numberOfDays: number) => {
  return http.get<StockRecommendation>(`/stock/historical/gains`,
      {
        params: {
          symbols: symbols.join(","),
          numberOfDays: numberOfDays
        },
      }
  );
};

const AiStockService = {
  getStocks : getStocks,
  getHistorical : getHistorical,
  getHistoricalGains : getHistoricalGains,
};

export default AiStockService;
