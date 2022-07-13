import React from 'react';
import classes from './FileDescription.module.css';
import TextDescription from './TextDescription';
import ImageDescription from './ImageDescription';

const FileDescription = ({file, type, show}) => {
    return (
        <div
            className={classes.description}
            style={{display: show ? "flex" : "none"}}
        >
            {
                type === "text/plain"
                    ? <TextDescription file={file} />
                    : <ImageDescription file={file} />
            }
        </div>
    );
};

export default FileDescription;