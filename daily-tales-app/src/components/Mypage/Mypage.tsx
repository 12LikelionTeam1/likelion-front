import React from 'react';
import styles from './styles/mypage.module.css';
import Header from './components/Header';
import Profile from './components/Profile';
import WritingList from './components/WritingList';
import Badge from './components/Badge';
import Analysis from './components/Analysis';
import BreakLine from '@components/common/BreakLine/BreakLine';
import Modal from './components/Modal';
import { useModal } from './contexts/ModalContext';
import { MainKeywordsType, UserInfoType } from './containers/MypageContainer';

interface MypageProps {
    mainKeywords: MainKeywordsType[];
    publishedWritings: number;
    userInfo : UserInfoType | null;
    updateWritingVisibility: (id: string, visibility: 'PUBLIC' | 'PRIVATE') => void;
}

const Mypage = ({ mainKeywords, publishedWritings, userInfo, updateWritingVisibility }: MypageProps) => {
    const { openModal } = useModal();

    const handleDatePicked = (date: Date) => {
    console.log('Date picked:', date);
};

return (
    <div className={styles.scroll}>
        <Header />
        <BreakLine />
        {userInfo && <Profile userInfo={userInfo} />}
        <BreakLine />
        <WritingList onDatePicked={handleDatePicked} openModal={openModal} updateWritingVisibility={updateWritingVisibility}/>
        <BreakLine />
        <Badge />
        <BreakLine />
        <Analysis mainKeywords={mainKeywords} publishedWritings={publishedWritings} />
        <Modal />
    </div>
    );
};

export default Mypage;
