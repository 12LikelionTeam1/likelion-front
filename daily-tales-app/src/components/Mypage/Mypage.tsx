import React from 'react';
import styles from './styles/mypage.module.css';
import Header from './components/Header';
import UserInfo from './components/UserInfo';
import Profile from './components/Profile';
import WritingList from './components/WritingList';
import Badge from './components/Badge';
import Analysis from './components/Analysis';
import BreakLine from '@components/common/BreakLine/BreakLine';
import Modal from './components/Modal';
import { useModal } from './contexts/ModalContext';

const Mypage = () => {
    const { openModal } = useModal();

    const handleDatePicked = (date: Date) => {
    console.log('Date picked:', date);
};

return (
    <div className={styles.scroll}>
        <Header />
        <BreakLine />
        <UserInfo />
        <Profile />
        <BreakLine />
        <WritingList onDatePicked={handleDatePicked} openModal={openModal} />
        <BreakLine />
        <Badge />
        <BreakLine />
        <Analysis />
        <Modal />
    </div>
    );
};

export default Mypage;
