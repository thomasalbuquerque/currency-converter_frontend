import Head from 'next/head';
import React, { FormEvent, useEffect, useState } from 'react';
import { Button, Container, Form, Input } from 'reactstrap';
import styles from '@/styles/Home.module.scss';
import registerStyles from '../styles/register.module.scss';
import ToastComponent from '@/components/common/toast';
import { useRouter } from 'next/router';
import authService from '@/services/authService';
import { Translation } from '@/helpers/translation';
import ItemsOnTop from '@/components/ItemsOnTop';
import Image from 'next/image';
import infoIconImage from '../../public/info-icon.png';
import GitHubLinks from '@/components/GitHubLinks';

export default function Register() {
  const router = useRouter();
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const { locale } = router;
  const [localeTransitionIndex, setLocaleTransitionIndex] = useState(
    locale == 'pt-BR' ? 'ptBR' : 'enUS'
  );

  const height = '570px';

  useEffect(() => {
    if (sessionStorage.getItem('currencyConverter-token')) {
      router.push('/');
    }
  }, []);

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const firstName = formData.get('firstName')!.toString();
    const email = formData.get('email')!.toString();
    const confirmPassword = formData.get('confirmPassword')!.toString();
    const password = formData.get('password')!.toString();
    const params = { firstName, email, password };

    if (password !== confirmPassword) {
      setToastMessage(
        Translation[localeTransitionIndex].passwordAndConfirmation
      );
      setToastIsOpen(true);
      setTimeout(() => {
        setToastIsOpen(false);
      }, 1000 * 3);
      return;
    }
    const { data, status } = await authService.register(params);

    if (status === 201) {
      router.push('/login?success=true');
    } else {
      setToastMessage(data.message);
      setToastIsOpen(true);
      setTimeout(() => {
        setToastIsOpen(false);
      }, 1000 * 3);
    }
  };
  const handleReturnToHome = async () => {
    router.push('/');
  };
  const handleGoToLogin = async () => {
    router.push('/login');
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
        <title>{`CoinCalc - ${Translation[localeTransitionIndex].register}`}</title>
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
            <Form className={registerStyles.form} onSubmit={handleRegister}>
              <p className={styles.appSubTitle}>
                {Translation[localeTransitionIndex].register}
              </p>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                className={registerStyles.input}
                placeholder={Translation[localeTransitionIndex].firstName}
                required></Input>
              <div className={registerStyles.emailInputDiv}>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  className={registerStyles.input}
                  placeholder="Email"
                  required></Input>
                <div
                  id={registerStyles.imageInfoDivRegister}
                  className={styles.imageInfoDiv}
                  data-descr={
                    Translation[localeTransitionIndex].imageInfoDescrRegister
                  }>
                  <Image
                    id={registerStyles.infoImageRegister}
                    src={infoIconImage}
                    className={styles.imageInfo}
                    alt=""
                  />{' '}
                </div>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                className={registerStyles.input}
                placeholder={Translation[localeTransitionIndex].password}
                required></Input>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                className={registerStyles.input}
                placeholder={Translation[localeTransitionIndex].confirmPassword}
                required></Input>
              <Button type="submit" className={styles.button}>
                {Translation[localeTransitionIndex].createAccount}
              </Button>
            </Form>
            <section className={styles.buttonsSection}>
              <Button className={styles.button} onClick={handleReturnToHome}>
                {Translation[localeTransitionIndex].returnToHome}
              </Button>
              <Button className={styles.button} onClick={handleGoToLogin}>
                {Translation[localeTransitionIndex].goToLogin}
              </Button>
            </section>
          </div>
        </Container>
        <GitHubLinks />
        <ToastComponent
          color="bg-danger"
          isOpen={toastIsOpen}
          message={toastMessage}
        />
      </main>
    </>
  );
}
