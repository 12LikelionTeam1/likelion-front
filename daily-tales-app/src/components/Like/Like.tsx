import React from 'react';
import styles from '../styles/like.module.css';
import Header from './components/Header';
import BreakLine from '@components/common/BreakLine/BreakLine';
import { WritingCollectionType } from './containers/LikeContainer';

interface LikeProps {
    writingCollection: WritingCollectionType[];
}
const Like = ({ writingCollection }: LikeProps) => {
    return (
        <>
            <Header />
            <BreakLine />
        </>
    );
};

export default Like;