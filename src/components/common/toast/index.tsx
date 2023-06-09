import { Toast, ToastBody } from 'reactstrap';
import styles from './styles.module.scss';

interface props {
  isOpen: boolean;
  message: string;
  color: string;
}

const ToastComponent = function ({ isOpen, message, color }: props) {
  return (
    <>
      <Toast
        className={`${color} text-white fixed-top ms-auto mt-3 ${styles.toast}`}
        isOpen={isOpen}>
        <ToastBody className={`text-center ${styles.toastBody}`}>
          {message}
        </ToastBody>
      </Toast>
    </>
  );
};

export default ToastComponent;
