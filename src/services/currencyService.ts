import { AxiosResponse } from "axios"
import api from "./api"

export interface Currency {
  id: number
  currencyName: string
  ratioPerDOllar: number
  createdAt: Date
}

const currencyService = {
  getCurrencies: async function () {
    const res: AxiosResponse = await api.get('/currencies').catch((error) => {
      return error.response;
    });

    const typedRes: Currency[] = res.data;
    return typedRes;
  },
}

export default currencyService