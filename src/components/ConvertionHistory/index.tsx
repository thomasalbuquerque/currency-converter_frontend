import convertionService, { Convertion } from '@/services/convertionService';
import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'reactstrap';
import styles from './styles.module.scss';
import homeStyles from '../../styles/Home.module.scss';
import { Translation } from '@/helpers/translation';
interface props {
  isLogged: boolean;
  oneNewConvertionSaved: number;
  localeTransitionIndex: string;
}
export default function ConvertionHistory({
  isLogged,
  oneNewConvertionSaved,
  localeTransitionIndex,
}: props) {
  const [convertionList, setConvertionList] = useState<Convertion[]>();
  const [deletedConvertions, setDletedConvertions] = useState(0);

  function sortArrayPerDate(unsorted: Convertion[]) {
    const sortedConvertionList = unsorted?.sort(function (a, b) {
      return (
        new Date(b.createdAt!).valueOf() - new Date(a.createdAt!).valueOf()
      );
    });
    return sortedConvertionList;
  }
  async function getConvertions() {
    const res = await convertionService.getConvertions();
    const sortedRes = sortArrayPerDate(res);
    setConvertionList(sortedRes);
  }
  useEffect(() => {
    if (isLogged) {
      getConvertions();
    }
  }, [isLogged, oneNewConvertionSaved, deletedConvertions]);
  function round(n: number) {
    const roundedResult = Math.round((n + Number.EPSILON) * 100) / 100;
    return roundedResult;
  }
  function formatDate(date: Date, localeTransitionIndex: string) {
    const stringDate = date.toString();
    const year = stringDate.slice(0, 4);
    const month = stringDate.slice(5, 7);
    const day = stringDate.slice(8, 10);
    const hours = stringDate.slice(11, 13);
    const minutes = stringDate.slice(14, 16);

    const hoursNumber = (parseFloat(hours) - 3 + 24) % 24;
    let amPm: string;
    let localHours: number;
    try {
      if (localeTransitionIndex === 'ptBR') {
        return `${day}/${month}/${year} às ${hoursNumber}:${minutes}`;
      } else if (localeTransitionIndex === 'enUS') {
        if (hoursNumber >= 13) {
          localHours = hoursNumber - 12;
          amPm = 'pm';
        } else {
          localHours = hoursNumber;
          amPm = 'am';
        }
        return `${month}/${day}/${year} at ${localHours}:${minutes} ${amPm}`;
      } else {
        throw new Error('invalid localeTransitionIndex');
      }
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      }
    }
  }
  async function handleDelete() {
    const res = await convertionService.deleteConvertions();
    setDletedConvertions(deletedConvertions + 1);
  }
  return (
    <>
      <div className={styles.list}>
        <p className={styles.title}>
          {Translation[localeTransitionIndex].convertionHistory}
        </p>
        {convertionList?.length === 0 ? (
          <p className={styles.empty}>
            {Translation[localeTransitionIndex].emptyConvertionHistory}
          </p>
        ) : (
          convertionList?.map((convertion) => (
            <div className={styles.card} key={convertion.createdAt!.toString()}>
              <div className={styles.cardContent}>
                <div className={styles.date}>
                  {formatDate(convertion.createdAt!, localeTransitionIndex)}
                </div>
                <div className={styles.convertion}>
                  <Row>
                    <Col xs="5">
                      <div className={styles.from}>
                        <div className={styles.currencyName}>
                          {convertion.fromCurrencyName}
                        </div>
                        <div className={styles.currencyValue}>
                          {convertion.fromCurrencyValue}
                        </div>
                      </div>
                    </Col>
                    <Col className={styles.arrow} xs="2">
                      <img
                        className={styles.img}
                        src="./arrow-right-white.png"
                        alt="arrow right blue"
                      />
                    </Col>
                    <Col xs="5">
                      <div className={styles.to}>
                        <div className={styles.currencyName}>
                          {convertion.toCurrencyName}
                        </div>
                        <div className={styles.currencyValue}>
                          {convertion.toCurrencyValue}
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
                <div className={styles.bases}>
                  <div className={styles.baseValue}>
                    1 {convertion.fromCurrencyName} ={' '}
                    {round(
                      convertion.toCurrencyRatio / convertion.fromCurrencyRatio
                    )}{' '}
                    {convertion.toCurrencyName}
                  </div>
                  <div className={styles.baseValue}>
                    1 {convertion.toCurrencyName} ={' '}
                    {round(
                      convertion.fromCurrencyRatio / convertion.toCurrencyRatio
                    )}{' '}
                    {convertion.fromCurrencyName}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
        {convertionList?.length === 0 ? (
          <></>
        ) : (
          <section className={homeStyles.buttonsSection}>
            <Button className={homeStyles.button} onClick={handleDelete}>
              {Translation[localeTransitionIndex].deleteConvertionHistory}
            </Button>
          </section>
        )}
      </div>
    </>
  );
}
