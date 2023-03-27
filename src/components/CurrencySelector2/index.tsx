import styles from './styles.module.scss';
import { Inter } from 'next/font/google';
import { Currency } from '@/services/currencyService';
interface props {
  currencyList: Currency[];
  selectedCurrencyIndex: number;
  onChangeCurrency: any;
}
const inter = Inter({ subsets: ['latin'] });

export default function CurrencySelector2({
  currencyList,
  selectedCurrencyIndex,
  onChangeCurrency,
}: props) {
  return (
    <>
      <div className={styles.customSelect}>
        <select
          className={styles.select}
          onChange={onChangeCurrency}
          value={currencyList[selectedCurrencyIndex].id}
        >
          {currencyList?.length === 0 ? (
            <p>
              <option className={styles.option} value="EmptyList">
                Empty Currency List
              </option>
            </p>
          ) : (
            currencyList?.map((currency, index) => (
              <option key={index} className={styles.option} value={currency.id}>
                {currency.currencyName}
              </option>
            ))
          )}
        </select>
        <span className={styles.arrow}> </span>
      </div>
    </>
  );
}
