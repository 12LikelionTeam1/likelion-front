import React from 'react';
import Header from './components/Header';
import BreakLine from '@components/common/BreakLine/BreakLine';
import { WritingCollectionType } from './containers/LikeContainer';
import WritingCollection from './components/WritingCollection';
import styles from './styles/like.module.css'

interface LikeProps {
    writingCollection: WritingCollectionType[];
}
const Like = ({ writingCollection }: LikeProps) => {
    return (
        <div className={styles.scroll}>
            <Header />
            <BreakLine />
            <WritingCollection writingCollection={writingCollection} />
        </div>
    );
};

export default Like;