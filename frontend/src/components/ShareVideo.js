import React, { useState } from 'react';
import axios from 'axios';

const ShareVideo = () => {
    const [url, setUrl] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/share-video`, { link: url }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data.hasError) {
                alert(response.data.message);
            } 
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="url">YouTube URL</label>
                <input
                    type="text"
                    id="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                />
            </div>
            <input type="submit" value="Share" />
        </form>
    );
};

export default ShareVideo;
