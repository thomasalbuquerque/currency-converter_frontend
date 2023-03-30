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
  createdAt?: Date
}

const convertionService = {
  getConvertions: async () => {
    const token = sessionStorage.getItem('currencyConverter-token');
    const res: AxiosResponse = await api.get('/convertions',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        console.log(error.response.data.message);

        return error.response;
      });
    console.log(res)
    const typedRes: Convertion[] = res.data
    return typedRes
  },

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

    const res: AxiosResponse = await api
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
  deleteConvertions: async () => {
    const token = sessionStorage.getItem('currencyConverter-token');
    const res: AxiosResponse = await api.delete('/convertions',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        console.log(error.response.data.message);

        return error.response;
      });
    console.log('res deleteConvertions')
    console.log(res)
    return res
  },
};

export default convertionService;
