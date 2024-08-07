import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

export const registerUser = async (email, password) => {
    return await axios.post(`${apiUrl}/user/signup`, { email, password });
};

export const loginUser = async (email, password) => {
    return await axios.post(`${apiUrl}/usesr/login`, { email, password });
};

export const shareVideo = async (url) => {
    const token = localStorage.getItem('token');
    return await axios.post(
        `${apiUrl}/share-video`,
        { url },
        { headers: { Authorization: `Bearer ${token}` } }
    );
};

export const fetchVideos = async () => {
    return await axios.get(`${apiUrl}/ahre-video`);
};
