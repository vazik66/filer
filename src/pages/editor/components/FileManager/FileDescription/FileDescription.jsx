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

const FileDescription = ({file}) => {
    return (
        <div
            className={classes.description}
            style={{display: file.extended ? "flex" : "none"}}
        >
            {file.extended && switchRenderer(file.value)}
        </div>
    );
};

export default FileDescription;