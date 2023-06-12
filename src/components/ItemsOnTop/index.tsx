import React from 'react';
import ToggleLocaleButton from '../ToggleLocaleButton';
import LoggedStatus from '../LoggedStatus';
import styles from '../../styles/loggedToggle.module.scss';

interface props {
  handleToggleLocale: () => void;
  localeTransitionIndex: string;
  logged: boolean;
}

export default function ItemsOnTop({
  handleToggleLocale,
  localeTransitionIndex,
  logged,
}: props) {
  return (
    <>
      <div className={styles.localeAndLogged}>
        <ToggleLocaleButton handleToggleLocale={handleToggleLocale} />
        <LoggedStatus
          logged={logged}
          localeTransitionIndex={localeTransitionIndex}
        />
      </div>
    </>
  );
}
