import { AxiosResponse } from 'axios';
import api from './api';

export interface Convertion {
  fromCurrencyId: number;
  toCurrencyId: number;
  fromCurrencyName: string;
  toCurrencyName: string;
  fromCurrencyValue: number;
  toCurrencyValue: number;
  fromCurrencyRatio: number;
  toCurrencyRatio: number;
}

const currencyService = {
  saveConvertion: async ({
    fromCurrencyId,
    toCurrencyId,
    fromCurrencyName,
    toCurrencyName,
    fromCurrencyValue,
    toCurrencyValue,
    fromCurrencyRatio,
    toCurrencyRatio,
  }: Convertion) => {
    const token = sessionStorage.getItem('currencyConverter-token');

    const res = await api
      .post(
        `/convertions/`,
        {
          fromCurrencyId,
          toCurrencyId,
          fromCurrencyName,
          toCurrencyName,
          fromCurrencyValue,
          toCurrencyValue,
          fromCurrencyRatio,
          toCurrencyRatio,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .catch((error) => {
        console.log(error.response.data.message);

        return error.response;
      });

    console.log(res)
    return res;
  },
};

export default currencyService;
