import { AxiosResponse } from "axios"
import api from "./api"
import { fetchTestApi } from "@/helpers/fetchTestApi"
import CurrencyAPI from "../helpers/CurrencyAPI"

export interface Currency {
  id: number
  currencyName: string
  ratioPerDollar: string
  createdAt: Date
}

function processCurrencyList(currencyList: any) {
  const rawCl: { code: string, value: number }[] = Object.values(currencyList['data'])
  let newCL: Currency[] = []
  rawCl.forEach((rawCurrency, index) => {
    newCL.push({ id: index, currencyName: rawCurrency.code, ratioPerDollar: rawCurrency.value.toString(), createdAt: new Date() })
  })
  return newCL
}

async function fetchCurrencyList() {
  const response = await CurrencyAPI() //fetchTestApi()
  const currencyList = processCurrencyList(response)
  return currencyList
}
function setLocalStore(currencyList: Currency[], dateString: string) {
  const stored = {
    currencyList: currencyList,
    dateString: dateString
  };
  localStorage.setItem('storedCurrencyList', JSON.stringify(stored));
}

const currencyService = {
  getCurrenciesExternal: async function () {

    const stored_stringFormat = localStorage.getItem('storedCurrencyList');

    if (stored_stringFormat) {
      const stored: { currencyList: Currency[], dateString: string } = JSON.parse(stored_stringFormat);
      const today = new Date().toLocaleDateString();
      if (stored.dateString !== today) {
        try {
          const currencyList = await fetchCurrencyList()
          setLocalStore(currencyList, today)
          return (currencyList)
        } catch (error) {
          return [];
        }
      } else {
        return (stored.currencyList)
      }
    } else {
      try {
        const currencyList = await fetchCurrencyList()
        setLocalStore(currencyList, new Date().toLocaleDateString())
        return currencyList;
      } catch (error) {
        return [];
      }
    }
  },
  getCurrencies: async function () {
    const res: AxiosResponse = await api.get('/currencies').catch((error) => {
      return error.response;
    });

    const typedRes: Currency[] = res.data;
    return typedRes;
  }
}

export default currencyService