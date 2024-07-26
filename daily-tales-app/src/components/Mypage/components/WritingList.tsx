import React, { useState } from 'react';
import styles from '../styles/mypage.module.css';
import images from '@assets/images';
import DatePicker from '@components/common/DatePicker/DatePicker';
import NanumText from '@components/common/NanumText/NanumText';

type Shared = 'shared' | 'noshared';

interface WritingListProps {
    onDatePicked: (date: Date) => void;
    openModal: (content: string) => void;
}

const ModalContent = <NanumText>#2 번째 글 고독한 예술가의 오후</NanumText>

const WritingList = ({ onDatePicked, openModal }: WritingListProps) => {
    const [current, setCurrent] = useState(new Date());
    const [shared, setShared] = useState<Shared>('noshared');

    const handleOpenModal = () => {
        openModal(ModalContent);
};

    const writings = [
        { id: 1, shared: shared === 'noshared' },
        { id: 2, shared: shared === 'shared' },
    ];

return (
    <div className={styles.writingcontainer}>
        <div className={styles.writingheader}>
            <img src={images.icons.notebook} alt='notebook' />
            <p>작성한 감상문</p>
            <div className={styles.datepicker}>
                <DatePicker onDatePicked={(date) => { setCurrent(date); onDatePicked(date); }} />
            </div>
        </div>
        
        {writings.length > 0 ? (
                writings.map((writing) =>(
                <div key={writing.id} className={styles.writingcontent}>
                    <p>#{writing.id} 번째 글 고독한 예술가의 오후</p>
                    {writing.shared ? (
                        <span>감상 공유중</span>
                    ) : (
                        <button onClick={handleOpenModal} className={styles.closeButton}>감상 공유하기</button>
                    )}
                </div>
                ))
            ) : (
                <div className={styles.emptyContent}>
                    <img src={images.logoa} alt='empty' />
                    <NanumText>감상문을 작성하고</NanumText>
                    <NanumText>공유해보세요!</NanumText>
                </div>
            )}
    </div>
    );
};

export default WritingList;
