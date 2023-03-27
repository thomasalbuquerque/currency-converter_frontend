import React from 'react';
import { Input, InputGroup, InputGroupText } from 'reactstrap';
import styles from './styles.module.scss';

export default function ValueBox() {
  return (
    <>
      <InputGroup className={styles.valueBox}>
        <InputGroupText className={styles.moneySymbol}>$</InputGroupText>
        <Input
          type="number"
          className={`form-control ${styles.inputValue}`}
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </InputGroup>
    </>
  );
}
