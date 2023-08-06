import styles from './styles.module.scss';
import { Spinner } from 'reactstrap';

function SpinnerComponent() {
  return (
    <div className={styles.spinner}>
      <Spinner color="light"></Spinner>
    </div>
  );
}

export default SpinnerComponent;
