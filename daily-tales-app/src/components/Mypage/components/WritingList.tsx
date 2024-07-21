import React, { useState } from 'react';
import styles from '../styles/mypage.module.css';
import images from '@assets/images';
import DatePicker from '@components/common/DatePicker/DatePicker';

type Shared = 'shared' | 'noshared';

interface WritingListProps {
    onDatePicked: (date: Date) => void;
    openModal: (content: string) => void;
}

const WritingList = ({ onDatePicked, openModal }: WritingListProps) => {
    const [current, setCurrent] = useState(new Date());
    const [shared, setShared] = useState<Shared>('noshared');

    const handleOpenModal = () => {
        openModal('모달 내용');
};

return (
    <div className={styles.writingcontainer}>
        <div className={styles.writingheader}>
            <img src={images.icons.notebook} alt='notebook' />
            <p>작성한 감상문</p>
            <div className={styles.datepicker}>
                <DatePicker onDatePicked={(date) => { setCurrent(date); onDatePicked(date); }} />
            </div>
        </div>
        <div className={styles.writingcontent}>
            <p>#1 번째 글 고독한 예술가의 오후</p>
            {shared === 'noshared' ? (
                <span>감상 공유중</span>
            ) : (
                <button onClick={handleOpenModal} className={styles.closeButton}>감상 공유하기</button>
            )}
        </div>
        <div className={styles.writingcontent}>
            <p>#2 번째 글 고독한 예술가의 오후</p>
            {shared === 'shared' ? (
                <span>감상 공유중</span>
                ) : (
                <button onClick={handleOpenModal} className={styles.closeButton}>감상 공유하기</button>
                )}
        </div>
    </div>
    );
};

export default WritingList;
