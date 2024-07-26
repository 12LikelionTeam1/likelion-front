import axios from 'axios';

interface UserInfoResponse {
    display_id: string;
    nickname: string;
    profile_image_url: string;
}

export const getUserInfo = async (token: string): Promise<UserInfoResponse> => {
    const response = await axios.get('/api/me', {
    headers: {
        Authorization: `Bearer ${token}`,
    },
});

return response.data;
};
