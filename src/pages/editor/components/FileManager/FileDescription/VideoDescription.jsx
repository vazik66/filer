import React from 'react';
import ReactPlayer from "react-player";

const VideoDescription = ({file}) => {
    return (
        <ReactPlayer
            url={URL.createObjectURL(file)}
            width="100%"
            height="400px"
            controls
            playing
        />
    );
};

export default VideoDescription;