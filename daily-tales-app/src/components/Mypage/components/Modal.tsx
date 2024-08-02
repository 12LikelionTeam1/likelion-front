import styles from '../styles/Modal.module.css';
import { useModal } from '../contexts/ModalContext';

function Modal() {
  const { isOpen, content, closeModal } = useModal();

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <p>공유하기</p>
          <button onClick={closeModal} className={styles.closeButton}>
            X
          </button>
        </div>
        <div className={styles.modalBody}>
          <p>{content}</p>
        </div>
        <button className={styles.actionButton}>공유하기</button>
      </div>
    </div>
  );
}

export default Modal;
