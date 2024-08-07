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
                    <h2>{video.title}</h2>
                    <p>Shared by: {video.email}</p>
                    <p>{video.description}</p>
                    <div className="video-container">
                        <iframe
                            width="600"
                            height="400"
                            src={`https://www.youtube.com/embed/${extractVideoId(video.link)}`}
                            title={video.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
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
