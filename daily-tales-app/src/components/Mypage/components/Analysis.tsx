import React from 'react';
import styles from '../styles/mypage.module.css';
import images from '@assets/images';
import { MainKeywordsType } from '../containers/MypageContainer';

interface AnalysisProps {
    mainKeywords: MainKeywordsType[];
    publishedWritings: number;
}

const Analysis = ({ mainKeywords, publishedWritings }: AnalysisProps) => {
    return (
    <div className={styles.analysiscontainer}>
        <div className={styles.analysisheader}>
            <img src={images.icons.analysis} alt="analysis" />
            <p>나의 읽기 분석</p>
        </div>
        <div className={styles.read}>
            <div className={styles.iconText}>
                <img src={images.icons.book} alt="book" />
                <p>읽은 글</p>
            </div>
            <div className={styles.numread}>
                <img src={images.icons.books} alt="books" />
                <p>87편</p> {/* 수정하기 */}
            </div>
        </div>
        <div className={styles.share}>
            <div className={styles.iconText}>
                <img src={images.icons.edit} alt="edit" />
                <p>공유한 글</p>
            </div>
            <div className={styles.numshare}>
                <img src={images.icons.pens} alt="pens" />
                <p>{publishedWritings}편</p>
            </div>
        </div>
        <div className={styles.keyword}>
            <div className={styles.iconText}>
            <img src={images.icons.edit} alt="edit" />
            <p>주요 키워드</p>
        </div>
        <div className={styles.keywordcontent}>
            {mainKeywords.map((keyword, index) => (
                <p key={index}>#{keyword.keyword}</p>
            ))}
        </div>
        </div>
    </div>
    );
};

export default Analysis;
