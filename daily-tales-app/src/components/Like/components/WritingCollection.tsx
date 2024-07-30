import React from "react";
import styles from '../styles/header.module.css';
import { WritingCollectionType } from "../containers/LikeContainer";

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
                <p>{writing.writer.nickname} 작가님</p>
                <p>{writing.written_at}</p>
                <p>{writing.title}</p>
            </li>
        ))}
        </ul>
    </div>
    );
};

export default WritingCollection;