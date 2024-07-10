import styles from './styles/backdrop.module.css';

type Props = {
  readonly children: React.ReactNode;
  hide: () => void;
};

const Backdrop = ({ children, hide }: Props) => {
  return (
    <div
      className={styles.backdrop}
      onClick={(e) => {
        e.preventDefault();
        hide();
      }}>
      {children}
    </div>
  );
};

export default Backdrop;
