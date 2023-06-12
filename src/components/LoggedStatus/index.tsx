import styles from '../../styles/loggedToggle.module.scss';
import { useRouter } from 'next/router';
import { Translation } from '@/helpers/translation';

interface props {
  logged: boolean;
  localeTransitionIndex: string;
}

export default function LoggedStatus({ logged, localeTransitionIndex }: props) {
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
        <div className={styles.loggedToggleStatusDiv}>
          <p
            className={styles.loggedToggleStatus}
            onClick={handleClickOnLoggedIn}>
            {Translation[localeTransitionIndex].isLogged}
          </p>
        </div>
      ) : (
        <div className={styles.loggedToggleStatusDiv}>
          <p
            className={styles.loggedToggleStatus}
            onClick={handleClickOnNotLoggedIn}>
            {Translation[localeTransitionIndex].isNotLogged}
          </p>
        </div>
      )}
    </>
  );
}
