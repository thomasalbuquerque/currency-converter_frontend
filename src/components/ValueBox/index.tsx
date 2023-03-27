import React from 'react';
import { Input, InputGroup, InputGroupText } from 'reactstrap';
import styles from './styles.module.scss';

interface props {
  amount?: number;
  onChangeAmount: any;
}

export default function ValueBox({ amount, onChangeAmount }: props) {
  return (
    <>
      <InputGroup className={styles.valueBox}>
        <InputGroupText className={styles.moneySymbol}>$</InputGroupText>
        <Input
          type="number"
          className={`form-control ${styles.inputValue}`}
          aria-label="Username"
          aria-describedby="basic-addon1"
          value={amount || ''}
          onChange={onChangeAmount}
        />
      </InputGroup>
    </>
  );
}
