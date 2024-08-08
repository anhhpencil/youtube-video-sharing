import React, { useEffect, useState } from 'react';
import axios from 'axios';
import io from "socket.io-client";
const apiUrl = process.env.REACT_APP_API_URL;

const VideoList = () => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/share-video`);
                if (!response.data.hasError) {
                    setVideos(response.data.data.videos);
                } else alert(response.data.message);

            } catch (error) {
                console.error(error);
            }
        };

        fetchVideos();
        const token = localStorage.getItem('token');
        if (token) {
            const socket = io(apiUrl, {
                transports: ["websocket"],
                withCredentials: true,
                // auth: { 
                //     token
                // }
            });

            socket.on('connect', () => {
                console.log('WebSocket connected');
            });

            socket.off("newVideo").on("newVideo", (video) => {
                let data = JSON.parse(video);
                alert(`New video shared:\nTitle: ${data.title}\nShared by: ${data.email}`);
            });
        }
    }, []);

    return (
        <div className="video-list">
            {videos.map((video) => (
                <div key={video.id} className="video-item">
                    <div className="video-container">
                        <iframe
                            width="560"
                            height="315"
                            src={`https://www.youtube.com/embed/${extractVideoId(video.link)}`}
                            title={video.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                    <div className="video-details">
                        <h2>{video.title}</h2>
                        <p><strong>Shared by:</strong> {video.email}</p>
                        <p><strong>Description:</strong> {video.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );

};

// Helper function to extract video ID from YouTube URL
const extractVideoId = (url) => {
    const match = url.match(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|videoseries\?list=)?([^"&?\/\s]{11})/);
    return match ? match[1] : null;
};

export default VideoList;
