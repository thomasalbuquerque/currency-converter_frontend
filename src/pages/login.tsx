import Head from 'next/head';
import React, { FormEvent, useEffect, useState } from 'react';
import styles from '@/styles/Home.module.scss';
import registerStyles from '../styles/register.module.scss';
import { Button, Container, Form, Input } from 'reactstrap';
import ToastComponent from '@/components/common/toast';
import { useRouter } from 'next/router';
import authService from '@/services/authService';
import { Translation } from '@/helpers/translation';
import ItemsOnTop from '@/components/ItemsOnTop';
import GitHubLinks from '@/components/GitHubLinks';
const height = '450px';

export default function Login() {
  const router = useRouter();
  const [toastColor, setToastColor] = useState('');
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const { locale } = router;
  const [localeTransitionIndex, setLocaleTransitionIndex] = useState(
    locale == 'pt-BR' ? 'ptBR' : 'enUS'
  );

  useEffect(() => {
    if (sessionStorage.getItem('currencyConverter-token')) {
      router.push('/');
    }
  }, []);

  useEffect(() => {
    const registerSuccess = router.query.success;
    if (registerSuccess === 'true') {
      setToastColor('bg-success');
      setToastIsOpen(true);
      setTimeout(() => {
        setToastIsOpen(false);
      }, 1000 * 3);
      setToastMessage(Translation[localeTransitionIndex].successRegistered);
    }
    const isLogged = router.query.isLogged;
    if (isLogged === 'false') {
      setToastColor('bg-danger');
      setToastIsOpen(true);
      setTimeout(() => {
        setToastIsOpen(false);
      }, 1000 * 3);
      setToastMessage(Translation[localeTransitionIndex].pleaseLoginToast);
    }
  }, [router.query]);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email')!.toString();
    const password = formData.get('password')!.toString();
    const params = { email, password };

    const { status } = await authService.login(params);
    if (status === 200) {
      router.push('/');
    } else if (status === 401) {
      setToastColor('bg-danger');
      setToastIsOpen(true);
      setTimeout(() => {
        setToastIsOpen(false);
      }, 1000 * 3);
      setToastMessage(Translation[localeTransitionIndex].loginFailed);
    }
  };
  const handleReturnToHome = async () => {
    router.push('/');
  };
  const handleGoToRegister = async () => {
    router.push('/register');
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
        <title>{`CoinCalc - ${Translation[localeTransitionIndex].login}`}</title>
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
            logged={false}
          />
          <div className={styles.pageContent}>
            <Form className={registerStyles.form} onSubmit={handleLogin}>
              <p className={styles.appSubTitle}>Login</p>
              <Input
                id="email"
                name="email"
                type="email"
                className={registerStyles.input}
                placeholder="Email"
                required></Input>
              <Input
                id="password"
                name="password"
                type="password"
                className={registerStyles.input}
                placeholder={Translation[localeTransitionIndex].password}
                required></Input>
              <Button type="submit" className={styles.button}>
                {Translation[localeTransitionIndex].login}
              </Button>
            </Form>
            <section className={styles.buttonsSection}>
              <Button className={styles.button} onClick={handleReturnToHome}>
                {Translation[localeTransitionIndex].returnToHome}
              </Button>
              <Button className={styles.button} onClick={handleGoToRegister}>
                {Translation[localeTransitionIndex].goToRegister}
              </Button>
            </section>
          </div>
        </Container>
        <GitHubLinks />
        <ToastComponent
          color={toastColor}
          isOpen={toastIsOpen}
          message={toastMessage}
        />
      </main>
    </>
  );
}
