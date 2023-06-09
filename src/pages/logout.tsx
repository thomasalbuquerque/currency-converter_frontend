import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Button, Container } from 'reactstrap';
import styles from '../styles/Home.module.scss';
import { Translation } from '@/helpers/translation';
import ItemsOnTop from '@/components/ItemsOnTop';
import GitHubLinks from '@/components/GitHubLinks';

export default function Logout() {
  const height = '260px';

  const router = useRouter();
  const { locale } = router;
  const [localeTransitionIndex, setLocaleTransitionIndex] = useState(
    locale == 'pt-BR' ? 'ptBR' : 'enUS'
  );
  const handleReturnToHome = async () => {
    router.push('/');
  };
  const handleLogOut = async () => {
    sessionStorage.clear();
    router.push('/');
    router.push({
      pathname: '/',
      query: { successLogOut: 'true' },
    });
  };
  const handleToggleLocale = () => {
    const { pathname, asPath, query } = router;
    switch (locale) {
      case 'pt-BR':
        router.push({ pathname, query }, asPath, { locale: 'en-US' });
        setLocaleTransitionIndex('enUS');
        break;
      case 'en-US':
        router.push({ pathname, query }, asPath, { locale: 'pt-BR' });
        setLocaleTransitionIndex('ptBR');
        break;
    }
  };
  return (
    <>
      <Head>
        <title>{`CoinCalc - ${Translation[localeTransitionIndex].logout}`}</title>
        <meta
          name="description"
          content={Translation[localeTransitionIndex].descriptionMeta}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </Head>
      <main className={styles.main}>
        <Container className={styles.container} style={{ height: `${height}` }}>
          <ItemsOnTop
            handleToggleLocale={handleToggleLocale}
            localeTransitionIndex={localeTransitionIndex}
            logged={true}
          />
          <div className={styles.pageContent}>
            <section
              className={styles.buttonsSection}
              style={{ marginTop: `28px`, flexDirection: `column` }}>
              <Button className={styles.button} onClick={handleLogOut}>
                {Translation[localeTransitionIndex].logout}
              </Button>
              <Button className={styles.button} onClick={handleReturnToHome}>
                {Translation[localeTransitionIndex].returnToHome}
              </Button>
            </section>
          </div>
        </Container>
        <GitHubLinks />
      </main>
    </>
  );
}
