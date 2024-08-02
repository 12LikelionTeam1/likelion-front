import React from 'react';
import styles from '../styles/mypage.module.css';
import images from '@assets/images';
import DatePicker from '@components/common/DatePicker/DatePicker';
import NanumText from '@components/common/NanumText/NanumText';
import { WritingType } from '../containers/MypageContainer';

interface WritingListProps {
    onDatePicked: (date: Date) => void;
    openModal: (content: React.ReactNode) => void;
    updateWritingVisibility: (id: string, visibility: 'PUBLIC' | 'PRIVATE') => void;
    writings: WritingType[];
}

const WritingList = ({ onDatePicked, openModal, updateWritingVisibility, writings }: WritingListProps) => {

    const handleOpenModal = (id : string, title: string, index: number) => {
        const ModalContent = <NanumText>#{index} 번째 글 {title}</NanumText>;
        openModal(ModalContent);
        updateWritingVisibility(id, 'PUBLIC');
};


return (
    <div className={styles.writingcontainer}>
        <div className={styles.writingheader}>
            <img src={images.icons.notebook} alt='notebook' />
            <p>작성한 감상문</p>
            <div className={styles.datepicker}>
                <DatePicker onDatePicked={(date) => onDatePicked(date)} />
            </div>
        </div>
        
        {writings.length > 0 ? (
                writings.map((writing, index) =>(
                <div key={writing.id} className={styles.writingcontent}>
                    <p>#{index + 1} 번째 글 {writing.title}</p>
                    {writing.visibility === 'PUBLIC' ? (
                        <span>감상 공유중</span>
                    ) : (
                        <button onClick={() => handleOpenModal(writing.id, writing.title, index + 1)} className={styles.closeButton}>감상 공유하기</button>
                    )}
                </div>
                ))
            ) : (
                <div className={styles.emptyContent}>
                    <img src={images.logoa} alt='empty' />
                    <NanumText>{'감상문을 작성하고'}</NanumText>
                    <NanumText>{'공유해보세요!'}</NanumText>
                </div>
            )}
    </div>
    );
};

export default WritingList;
