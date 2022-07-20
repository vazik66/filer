import React from 'react';
import classes from './FileDescription.module.css';
import TextDescription from './TextDescription';
import ImageDescription from './ImageDescription';
import VideoDescription from "./VideoDescription";

const switchRenderer = file => {
    switch (file.type) {
        case 'text/plain':
            return <TextDescription file={file} />;
        case 'video/mp4':
        case 'video/mov':
        case 'video/ogv':
        case 'video/webm':
            return <VideoDescription file={file} />;
        default:
            return <ImageDescription file={file} />;
    }
};

const FileDescription = ({file, show}) => {
    return (
        <div
            className={classes.description}
            style={{display: show ? "flex" : "none"}}
        >
            {show && switchRenderer(file)}
        </div>
    );
};

export default FileDescription;