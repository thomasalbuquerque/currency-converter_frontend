import CurrencyAPIexternal from '@everapi/currencyapi-js';

export default async function CurrencyAPI() {
  const currencyApi = new CurrencyAPIexternal('B8BIg6sfAGzQ1gio8ovfa9XjpiKZDIBzOGqOs6oV');
  try {
    const response = await currencyApi.latest({
      base_currency: 'USD',
      currencies: 'AOA,ARS,AUD,BOB,BRL,CAD,CLP,CNY,COP,KRW,DKK,USD,EGP,EUR,EUR,JPY,MXN,MZN,NGN,NOK,PAB,PYG,PEN,GBP,SEK,CHF,UAH,UYU,ZAR'
    })
    return response
  } catch (error) {
    console.log(error)
    return error
  }
}
