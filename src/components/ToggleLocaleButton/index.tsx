import React from 'react';
import styles from '../../styles/loggedToggle.module.scss';
import { useRouter } from 'next/router';
import { Translation } from '@/helpers/translation';

interface props {
  handleToggleLocale: () => void;
}

const ToggleLocaleButton: React.FC<props> = ({ handleToggleLocale }) => {
  const router = useRouter();
  const { locale } = router;
  return (
    <>
      <div className={styles.loggedToggleStatusDiv}>
        <p className={styles.loggedToggleStatus} onClick={handleToggleLocale}>
          {locale === 'pt-BR'
            ? Translation['ptBR'].language
            : Translation['enUS'].language}
        </p>
      </div>
    </>
  );
};
export default ToggleLocaleButton;
