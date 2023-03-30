import convertionService, { Convertion } from '@/services/convertionService';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';
import styles from './styles.module.scss';

export default function ConvertionHistory() {
  const [convertionList, setConvertionList] = useState<Convertion[]>();
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem('currencyConverter-token')) {
      setIsLogged(false);
    } else {
      setIsLogged(true);
    }
  }, []);

  async function getConvertions() {
    const convertionList = await convertionService.getConvertions();
    console.log(convertionList);
  }
  useEffect(() => {
    if (isLogged) {
      getConvertions();
    }
  }, [isLogged]);
  return (
    <>
      <div className={styles.list}>
        <p className={styles.title}>Convertion History</p>
        <div className={styles.card}>
          <div className={styles.cardContent}>
            <div className={styles.date}>05/27/2023 at 2:45 pm</div>
            <div className={styles.convertion}>
              <Row>
                <Col xs="5">
                  <div className={styles.from}>
                    <div className={styles.currencyName}>Dollar</div>
                    <div className={styles.currencyValue}>U$ 2.00</div>
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
                    <div className={styles.currencyName}>Bitcoin</div>
                    <div className={styles.currencyValue}>₿ 0.00541484101</div>
                  </div>
                </Col>
              </Row>
            </div>
            <div className={styles.bases}>
              <div className={styles.baseValue}>
                1 dollar = 0.000487741 bitcoin
              </div>
              <div className={styles.baseValue}>
                1 bitcoin = 24,541.21 dollar
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
