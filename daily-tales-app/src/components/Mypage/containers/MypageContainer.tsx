import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import useAccount from '@hooks/useAccount';
import Mypage from '../Mypage';

export type MainKeywordsType = {
    keyword: string;
    frequency: number;
};

export type UserInfoType = {
    display_id: string;
    nickname: string;
    profile_image_url: string;
    email: string;
};


const MypageContainer = () => {
    const { account } = useAccount();

    const [mainKeywords, setMainKeywords] = useState<MainKeywordsType[]>([]);
    const [publishedWritings, setPublishedWritings] = useState<number>(0);
    const [userInfo, setUserInfo] = useState<UserInfoType | null>(null);

    const fetchUserInfo = useCallback(async () => {
        if (account && account.access_token) {
            try {
                const response = await axios.get('/me', {
                    headers: {
                    Authorization: `Bearer ${account.access_token}`,
                },
            });
            if (response.status === 200) {
                setUserInfo(response.data);
            }
        } catch (error) {
            console.error('유저 정보 불러오기 실패', error);
        }
        }
    }, [account]);
    
    const fetchMainKeywords = useCallback(async () => {
        if (account && account.access_token) {
            try {
            const response = await axios.get('/me/writings/statistics/main-keywords', {
                headers: {
                Authorization: `Bearer ${account.access_token}`,
            },
            params: {
                size: '10', // size 조정하기
                },
            });
            if (response.status === 200) {
                setMainKeywords(response.data.main_keywords);
            }
        } catch (error) {
            console.error('키워드 불러오기 실패', error);
        }
        }
    }, [account]);

    const fetchPublishedWritings = useCallback(async () => {
        if (account && account.access_token) {
            try {
            const response = await axios.get('/me/writings/statistics/published-writings', {
                headers: {
                Authorization: `Bearer ${account.access_token}`,},
            });
            if (response.status === 200) {
                setPublishedWritings(response.data.published_writings);
            }
        } catch (error) {
            console.error('작성한 글 수 불러오기 실패', error);
        }
        }}, [account]);

    const updateWritingVisibility = useCallback(
        async (id: string, visibility: 'PUBLIC' | 'PRIVATE') => {
            if (account && account.access_token) {
                try {
                    const response = await axios.patch(
                        `/api/me/writings/${id}/visibility`,
                        { visibility },
                        {
                            headers: {
                                Authorization: `Bearer ${account.access_token}`,
                            },
                        }
                );
                if (response.status === 200) {
                    console.log('Visibility updated successfully');
                }
                } catch (error) {
                    console.error('글 공유 범위 수정 실패', error);
                }
            }
            },
            [account]
        );

        useEffect(() => {
            fetchUserInfo;
            fetchMainKeywords();
            fetchPublishedWritings();}
            , [fetchUserInfo,fetchMainKeywords, fetchPublishedWritings]);


    return <Mypage mainKeywords={mainKeywords} publishedWritings={publishedWritings} userInfo={userInfo} updateWritingVisibility={updateWritingVisibility}/>;
}

export default MypageContainer;