import styles from './styles/mypage.module.css';
import images from '@assets/images';
import BreakLine from '@components/common/BreakLine/BreakLine';
import DatePicker from '@components/common/DatePicker/DatePicker';
import { useState } from 'react';

type Shared = 'shared' | 'noshared';

const Mypage = () => {
    const [current, setCurrent] = useState(new Date());
    const [shared, setShared] = useState<Shared>('noshared');

    return(
    <>
        <div className={styles.header}>
            <img src={images.icons.prev} alt='이전페이지' />
            <p>마이페이지</p>
        </div>
        <BreakLine/>
        <div className={styles.infocontainer}>
            <div className={styles.userinfo}>
                <img src={images.icons.user} alt='usericon' />
                <p>사용자 정보</p>
            </div>
            <div className={styles.savetab}>
                <a href=''>
                <img src={images.icons.heart} alt='heart' />
                문집 보러가기
                <img src={images.icons.next} alt='next' />
                </a>
            </div>
        </div>
        <div className={styles.profile}>
            <img></img>
            <div className={styles.name}>
                <p>홍길동 작가님</p>
                <div className={styles.email}>
                    <p>abc123@gmail.com</p>
                    <img src={images.googleLogo} alt='googlelogo' />
                </div>
            </div>
        </div>
        <BreakLine/>
        <div className={styles.writingcontainer}>
            <div className={styles.writingheader}>
                <img src={images.icons.notebook} alt='notebook' />
                <p>작성한 감상문</p>
                <div className={styles.datepicker}>
                    <DatePicker onDatePicked={setCurrent}/>
                </div>
            </div>
            <div className={styles.writingcontent}>
                <p>#1 번째 글 고독한 예술가의 오후</p>
                {shared == 'noshared' ? (
                        <span>감상 공유중</span>
                    ) : (
                        <button>감상 공유하기</button>
                    )}
            </div>
            <div className={styles.writingcontent}>
                <p>#2 번째 글 고독한 예술가의 오후</p>
                {shared == 'shared' ? (
                        <span>감상 공유중</span>
                    ) : (
                        <button>감상 공유하기</button>
                    )}
            </div>
        </div>
        <BreakLine/>
        <div className={styles.badgescontainer}>
            <div className={styles.badgeheader}>
                <img src={images.icons.badge} alt='badge' />
                <p>획득한 배지</p>
            </div>
        </div>
        <BreakLine/>
        <div className={styles.analysiscontainer}>
            <div className={styles.analysisheader}>
                <img src={images.icons.analysis} alt='analysis' />
                <p>나의 읽기 분석</p>
            </div>
            <div className={styles.read}>
                <div className={styles.iconText}>
                    <img src={images.icons.book} alt='book' />
                    <p>읽은 글</p>
                </div>
                <div className={styles.numread}>
                    <img src={images.icons.books} alt='books' />
                    <p>87편</p>
                </div>
            </div>
            <div className={styles.share}>
                <div className={styles.iconText}>
                    <img src={images.icons.edit} alt='edit' />
                    <p>공유한 글</p>
                </div>
                <div className={styles.numshare}>
                    <img src={images.icons.pens} alt='pens' />
                    <p>41편</p>
                </div>
            </div>
            <div className={styles.keyword}>
                <div className={styles.iconText}>
                    <img src={images.icons.edit} alt='edit' />
                    <p>주요 키워드</p>
                </div>
                <div className={styles.keywordcontent}>
                    <p>#철학</p>
                    <p>#철학</p>
                    <p>#철학</p>
                    <p>#철학</p>
                    <p>#철학</p>
                </div>
            </div>
        </div>
    </>
    )
};

export default Mypage;