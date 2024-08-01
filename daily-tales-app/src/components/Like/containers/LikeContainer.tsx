import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import useAccount from '@hooks/useAccount';
import WritingCollection from './../components/WritingCollection';
import Like from '../Like'

export type WritingCollectionType = {
    id: string;
    title: string;
    writer: {
        id: string;
        nickname: string;
        profile_image_url: string;
}; 
    written_at: string;
};

const LikeContainer = () => {
    const { account } = useAccount();
    const [writingCollection, setWritingCollection] = useState<WritingCollectionType[]>([]);

    const fetchWritingCollection = useCallback(async () => {
    if (account && account.access_token) {
        try {
        const response = await axios.get('/me/writing-collection', {
            headers: {
            Authorization: `Bearer ${account.access_token}`,
            },
        });
        if (response.status === 200) {
            setWritingCollection(response.data.collection);
        }
    } catch (error) {
        console.error('문집 불러오기 실패', error);
        }
    }
}, [account]);

    useEffect(() => {
        fetchWritingCollection();}
        , [fetchWritingCollection]);

        
    return (<Like writingCollection={writingCollection} />);
}

export default LikeContainer;