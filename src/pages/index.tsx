import Head from 'next/head';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.scss';
import { Button, Container } from 'reactstrap';
import CurrencySelector2 from '@/components/CurrencySelector2';
import { ChangeEvent, useEffect, useState } from 'react';
import currencyService, { Currency } from '@/services/currencyService';
import ValueBox from '@/components/ValueBox';
import { useRouter } from 'next/router';
import ToastComponent from '@/components/common/toast';
import convertionService from '../services/convertionService';
import ConvertionHistory from '@/components/ConvertionHistory';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const router = useRouter();

  const [currencyList, setCurrencyList] = useState<Currency[]>();

  const [fromCurrencyIndex, setFromCurrencyIndex] = useState(0);
  const [fromCurrencyObject, setFromCurrencyObject] = useState<Currency>();
  const [fromAmount, setFromAmount] = useState<number>();

  const [toCurrencyIndex, setToCurrencyIndex] = useState(1);
  const [toCurrencyObject, setToCurrencyObject] = useState<Currency>();
  const [toAmount, setToAmount] = useState<number>();

  const [gotAmount, setGotAmount] = useState<number>();
  const [conversionDirection, setConversionDirection] = useState('right');

  const [isLogged, setIsLogged] = useState(false);

  const [toastColor, setToastColor] = useState('');
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const height = '400px';

  const getCurrencies = async function () {
    const res = await currencyService.getCurrencies();
    if (res.length > 0) {
      setCurrencyList(res);
    }
  };

  useEffect(() => {
    getCurrencies();
  }, []);

  function showToast(color: string, message: string) {
    setToastColor(color);
    setToastIsOpen(true);
    setTimeout(() => {
      setToastIsOpen(false);
    }, 1000 * 3);
    setToastMessage(message);
  }
  useEffect(() => {
    if (!sessionStorage.getItem('currencyConverter-token')) {
      setIsLogged(false);
    } else {
      setIsLogged(true);
      showToast('bg-success', 'Successfully Logged In');
    }
  }, []);

  useEffect(() => {
    if (currencyList) {
      setFromCurrencyObject(currencyList[fromCurrencyIndex]);
      setToCurrencyObject(currencyList[toCurrencyIndex]);
    }
  }, [currencyList, fromCurrencyIndex, toCurrencyIndex]);

  function calculateResult(
    processedAmount: number,
    numerator: string,
    denominator: string
  ) {
    const factor = parseFloat(numerator) / parseFloat(denominator);
    const result = processedAmount * factor;
    const roundedResult = Math.round((result + Number.EPSILON) * 100) / 100;
    return roundedResult;
  }
  useEffect(() => {
    if (gotAmount === 0) {
      setFromAmount(0);
      setToAmount(0);
    }
    if (gotAmount && fromCurrencyObject && toCurrencyObject) {
      if (conversionDirection === 'right') {
        setFromAmount(gotAmount);

        const result = calculateResult(
          gotAmount,
          toCurrencyObject.ratioPerDollar,
          fromCurrencyObject.ratioPerDollar
        );
        setToAmount(result);
        //
      } else if (conversionDirection === 'left') {
        setToAmount(gotAmount);
        const result = calculateResult(
          gotAmount,
          fromCurrencyObject.ratioPerDollar,
          toCurrencyObject.ratioPerDollar
        );
        setFromAmount(result);
      }
    }
  }, [gotAmount, fromCurrencyObject, toCurrencyObject]);

  function handleClickOnNotLoggedIn() {
    router.push('/login');
  }
  function handleFromAmount(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.value) {
      setGotAmount(parseFloat(e.target.value));
    } else {
      setGotAmount(0);
    }
    setConversionDirection('right');
  }
  function handleToAmount(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.value) {
      setGotAmount(parseFloat(e.target.value));
    } else {
      setGotAmount(0);
    }
    setConversionDirection('left');
  }
  function handleSwitchInputs() {
    if (conversionDirection === 'right') {
      setConversionDirection('left');
    } else if (conversionDirection === 'left') {
      setConversionDirection('right');
    }
    const tempFromAmount = fromAmount;
    const tempFromCurrencyIndex = fromCurrencyIndex;
    const tempToAmount = toAmount;
    const tempToCurrencyIndex = toCurrencyIndex;

    setFromAmount(tempToAmount);
    setToAmount(tempFromAmount);

    setFromCurrencyIndex(tempToCurrencyIndex);
    setToCurrencyIndex(tempFromCurrencyIndex);
  }
  async function handleSaveConvertion() {
    if (!isLogged) {
      // router.push('/login?failed');
      router.push({
        pathname: '/login',
        query: { isLogged: 'false' },
      });
    } else {
      if (fromAmount && toAmount && fromCurrencyObject && toCurrencyObject) {
        if (conversionDirection === 'right') {
          const fromCurrencyId = fromCurrencyObject.id;
          const toCurrencyId = toCurrencyObject.id;
          const fromCurrencyName = fromCurrencyObject.currencyName;
          const toCurrencyName = toCurrencyObject.currencyName;
          const fromCurrencyValue = fromAmount;
          const toCurrencyValue = toAmount;
          const fromCurrencyRatio = parseFloat(
            fromCurrencyObject.ratioPerDollar
          );
          const toCurrencyRatio = parseFloat(toCurrencyObject.ratioPerDollar);

          const params = {
            fromCurrencyId,
            toCurrencyId,
            fromCurrencyName,
            toCurrencyName,
            fromCurrencyValue,
            toCurrencyValue,
            fromCurrencyRatio,
            toCurrencyRatio,
          };

          const res = await convertionService.saveConvertion(params);
          if (res.status === 201) {
            showToast('bg-success', 'Successfully stored');
          } else {
            showToast('bg-danger', res.statusText);
          }
        } else if (conversionDirection === 'left') {
          const fromCurrencyId = toCurrencyObject.id;
          const toCurrencyId = fromCurrencyObject.id;
          const fromCurrencyName = toCurrencyObject.currencyName;
          const toCurrencyName = fromCurrencyObject.currencyName;
          const fromCurrencyValue = toAmount;
          const toCurrencyValue = fromAmount;
          const fromCurrencyRatio = parseFloat(toCurrencyObject.ratioPerDollar);
          const toCurrencyRatio = parseFloat(fromCurrencyObject.ratioPerDollar);

          const params = {
            fromCurrencyId,
            toCurrencyId,
            fromCurrencyName,
            toCurrencyName,
            fromCurrencyValue,
            toCurrencyValue,
            fromCurrencyRatio,
            toCurrencyRatio,
          };

          const res = await convertionService.saveConvertion(params);
          if (res.status === 201) {
            showToast('bg-success', 'Successfully stored');
          } else {
            showToast('bg-danger', res.statusText);
          }
        }
      } else {
        showToast('bg-danger', 'Please insert values');
      }
    }
  }
  if (!currencyList) {
    return (
      <>
        <h1>Loading</h1>
      </>
    );
  } else {
    return (
      <>
        <Head>
          <title>Currency Converter</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500&display=swap"
            rel="stylesheet"
          />
        </Head>
        <main className={styles.main}>
          <Container className={styles.container}>
            {isLogged ? (
              <p className={styles.loggedStatus}>Logged in</p>
            ) : (
              <p
                className={styles.loggedStatus}
                onClick={handleClickOnNotLoggedIn}
              >
                Not logged in
              </p>
            )}
            <p className={styles.appTitle}>Currency Converter</p>
            <div className={styles.pageContent}>
              <section className={styles.inputs}>
                <div className={styles.inputPair} id="fromPair">
                  <ValueBox
                    amount={fromAmount}
                    onChangeAmount={handleFromAmount}
                  />
                  <CurrencySelector2
                    currencyList={currencyList}
                    selectedCurrencyIndex={fromCurrencyIndex}
                    onChangeCurrency={(e: any) => {
                      const findCurrencyAndReturnIndex = currencyList.findIndex(
                        (currency) => currency.id === parseFloat(e.target.value)
                      );
                      setFromCurrencyIndex(findCurrencyAndReturnIndex);
                    }}
                  />
                </div>
                <div className={styles.switchImageSection}>
                  <img
                    src="/arrow-left-right-white.svg"
                    className={styles.switchImage}
                    alt=""
                    onClick={handleSwitchInputs}
                  />
                </div>
                <div className={styles.inputPair} id="toPair">
                  <ValueBox amount={toAmount} onChangeAmount={handleToAmount} />
                  <CurrencySelector2
                    currencyList={currencyList}
                    selectedCurrencyIndex={toCurrencyIndex}
                    onChangeCurrency={(e: any) => {
                      const findCurrencyAndReturnIndex = currencyList.findIndex(
                        (currency) => currency.id === parseFloat(e.target.value)
                      );
                      setToCurrencyIndex(findCurrencyAndReturnIndex);
                    }}
                  />
                </div>
              </section>
              <section className={styles.buttonsSection}>
                <Button
                  className={styles.button}
                  onClick={handleSaveConvertion}
                >
                  Save Convertion
                </Button>
              </section>
              <section>
                {isLogged ? (
                  <ConvertionHistory />
                ) : (
                  <p className={styles.pleaseLogin}>
                    Please log in to see your Convertion History
                  </p>
                )}
              </section>
            </div>
          </Container>
          <ToastComponent
            color={toastColor}
            isOpen={toastIsOpen}
            message={toastMessage}
          />
        </main>
      </>
    );
  }
}
