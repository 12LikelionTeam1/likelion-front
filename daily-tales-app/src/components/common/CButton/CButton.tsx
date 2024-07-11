import styles from './styles/cbutton.module.css';

type Props = {
  label: string;
  onClicked: () => void;
};

const CButton = ({ label, onClicked }: Props) => {
  return (
    <button
      onClick={onClicked}
      className={`${styles.cbutton} flex flex-1 justify-center items-center bg-red`}>
      {label}
    </button>
  );
};

export default CButton;
