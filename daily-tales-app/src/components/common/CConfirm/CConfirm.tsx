import React from 'react';
import Backdrop from '../Backdrop/Backdrop';
import styles from './styles/cconfirm.module.css';
import images from '@assets/images';
import CButton from '../CButton/CButton';

type Props = {
  title: string;
  label: string;
  onConfirmed: () => void;
  hide: () => void;
  readonly children: React.ReactNode;
};

const CConfirm = ({ title, label, onConfirmed, hide, children }: Props) => {
  return (
    <Backdrop hide={hide}>
      <div
        onClick={(e) => e.stopPropagation()}
        className={`${styles.wrapper} flex flex-col justify-between items-center pt-3`}>
        <a className='text-black'>{title}</a>
        <button onClick={hide} className={styles.closeBtn}>
          <img src={images.icons.close} alt='닫기' />
        </button>
        <div>{children}</div>
        <div className={`${styles.btnWrapper} flex flex-row`}>
          <CButton
            label={label}
            onClicked={() => {
              onConfirmed();
              hide();
            }}
          />
        </div>
      </div>
    </Backdrop>
  );
};

export default CConfirm;
