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
  const rawCl: { code: string; value: number }[] = Object.values(currencyList['data'])
  let newCL: Currency[] = []
  rawCl.forEach((rawCurrency, index) => {
    newCL.push({
      id: index,
      currencyName: rawCurrency.code,
      ratioPerDollar: rawCurrency.value.toString(),
      createdAt: new Date(),
    })
  })
  return newCL
}

async function fetchCurrencyList() {
  const response = await CurrencyAPI()  //fetchTestApi()
  const currencyList = processCurrencyList(response)
  return currencyList
}

function setCookie(name: string, value: string, days: number) {
  const expirationDate = new Date()
  expirationDate.setTime(expirationDate.getTime() + days * 24 * 60 * 60 * 1000)
  const expires = "expires=" + expirationDate.toUTCString()
  document.cookie = name + "=" + value + ";" + expires + ";path=/"
}

function getCookie(name: string) {
  const decodedCookies = decodeURIComponent(document.cookie)
  const cookies = decodedCookies.split(';')
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim()
    if (cookie.indexOf(name + "=") === 0) {
      return cookie.substring(name.length + 1)
    }
  }
  return ""
}

const currencyService = {
  getCurrenciesExternal: async function () {
    const stored_stringFormat = getCookie('storedCurrencyList')
    const today = new Date().toLocaleDateString()

    if (stored_stringFormat) {
      const stored: { currencyList: Currency[]; dateString: string } = JSON.parse(stored_stringFormat)
      if (stored.dateString !== today) {
        try {
          const currencyList = await fetchCurrencyList()
          setCookie('storedCurrencyList', JSON.stringify({ currencyList, dateString: today }), 1)
          return currencyList
        } catch (error) {
          return []
        }
      } else {
        return stored.currencyList
      }
    } else {
      try {
        const currencyList = await fetchCurrencyList()
        setCookie('storedCurrencyList', JSON.stringify({ currencyList, dateString: today }), 1)
        return currencyList
      } catch (error) {
        return []
      }
    }
  },
  getCurrencies: async function () {
    const res: AxiosResponse = await api.get('/currencies').catch((error) => {
      return error.response
    })

    const typedRes: Currency[] = res.data
    return typedRes
  },
}

export default currencyService
