import React from "react";
import styles from '../styles/like.module.css';
import { WritingCollectionType } from "../containers/LikeContainer";
import NanumText from "@components/common/NanumText/NanumText";

interface LikeProps {
    writingCollection: WritingCollectionType[];
}

const WritingCollection = ({ writingCollection }: LikeProps) => {

    return (
    <div className={styles.likeWrapper}>
        <ul>
            {writingCollection.map((writing) => (
            <li key={writing.id} className={styles.writingItem}>
                <img src={writing.writer.profile_image_url} alt="Profile" className={styles.profileImage} />
                <div className={styles.writingDetails}>
                    <p className={styles.nickname}>{writing.writer.nickname} 작가님</p>
                    <p className={styles.date}>{new Date(writing.written_at).toLocaleDateString()}</p>
                </div>
                <div className="title">
                    <NanumText>{writing.title}</NanumText>
                </div>
            </li>
        ))}
        </ul>
    </div>
    );
};

export default WritingCollection;