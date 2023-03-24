import styles from './styles.module.scss';

import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import { Container, Form, Input, InputGroup, InputGroupText } from 'reactstrap';
import { Currency } from '@/services/currencyService';
interface props {
  currencyList: Currency[];
}
const inter = Inter({ subsets: ['latin'] });

export default function CurrencySelector2({ currencyList }: props) {
  return (
    <>
      <section>
        <select className={styles.select}>
          {currencyList?.length === 0 ? (
            <p>
              <option className={styles.option} value="opcao1">
                Empty Currency List
              </option>
            </p>
          ) : (
            currencyList?.map((currency) => (
              <option className={styles.option} value="opcao1">
                {currency.currencyName}
              </option>
            ))
          )}
        </select>
        <span className={styles.arrow}> </span>
      </section>
    </>
  );
}
