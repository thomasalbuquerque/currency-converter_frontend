import convertionService, { Convertion } from '@/services/convertionService';
import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'reactstrap';
import styles from './styles.module.scss';
import homeStyles from '../../styles/Home.module.scss';
interface props {
  isLogged: boolean;
  oneNewConvertionSaved: number;
}
export default function ConvertionHistory({
  isLogged,
  oneNewConvertionSaved,
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
    console.log(res);
    const sortedRes = sortArrayPerDate(res);
    setConvertionList(sortedRes);
    console.log('convertionList estado');
    console.log(convertionList);
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
  function formatDate(date: Date) {
    const stringDate = date.toString();
    const year = stringDate.slice(0, 4);
    const month = stringDate.slice(5, 7);
    const day = stringDate.slice(8, 10);
    const hours = stringDate.slice(11, 13);
    const minutes = stringDate.slice(14, 16);

    const hoursNumber = parseFloat(hours);
    let localHours = hoursNumber;
    let amPm: string;
    if (hoursNumber >= 13) {
      localHours = hoursNumber - 3;
      if (localHours === 0) {
        localHours = 12;
      }
      amPm = 'pm';
    } else {
      amPm = 'am';
    }
    return `${month}/${day}/${year} at ${localHours}:${minutes} ${amPm}`;
  }
  async function handleDelete() {
    const res = await convertionService.deleteConvertions();
    console.log('res ConvertionHistory');
    console.log(res);
    setDletedConvertions(deletedConvertions + 1);
  }
  return (
    <>
      <div className={styles.list}>
        <p className={styles.title}>Convertion History</p>
        {convertionList?.length === 0 ? (
          <p className={styles.empty}>Empty Convertion History</p>
        ) : (
          convertionList?.map((convertion) => (
            <div className={styles.card} key={convertion.createdAt!.toString()}>
              <div className={styles.cardContent}>
                <div className={styles.date}>
                  {formatDate(convertion.createdAt!)}
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
              Delete Convertion History
            </Button>
          </section>
        )}
      </div>
    </>
  );
}
