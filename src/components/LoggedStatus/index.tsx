import styles from './styles.module.scss';
import React from 'react';
import { useRouter } from 'next/router';

interface props {
  logged: boolean;
}

export default function LoggedStatus({ logged }: props) {
  const router = useRouter();
  function handleClickOnNotLoggedIn() {
    router.push('/login');
  }
  function handleClickOnLoggedIn() {
    router.push('/logout');
  }
  return (
    <>
      {logged ? (
        <div className={styles.loggedStatusDiv}>
          <p
            className={styles.loggedStatus}
            onClick={handleClickOnLoggedIn}
            data-descr="small popups that appear when hovering"
          >
            Logged
          </p>
        </div>
      ) : (
        <div className={styles.loggedStatusDiv}>
          <p
            className={styles.loggedStatus}
            onClick={handleClickOnNotLoggedIn}
            data-descr="small popups that appear when hovering"
          >
            Not logged
          </p>
        </div>
      )}
    </>
  );
}
