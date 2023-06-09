import React from 'react';
import styles from './styles.module.scss';

const GitHubLinks = () => {
  return (
    <>
      <div className={styles.github}>
        <a
          href="https://github.com/thomasalbuquerque/currency-converter_frontend"
          className={styles.githubLinks}
          target="_blank">
          Frontend
        </a>
        <img src="./github-mark-gray.png" className={styles.gitHubLogo}></img>
        <a
          href="https://github.com/thomasalbuquerque/currency-converter_backend"
          className={styles.githubLinks}
          target="_blank">
          Backend
        </a>
      </div>
    </>
  );
};

export default GitHubLinks;
