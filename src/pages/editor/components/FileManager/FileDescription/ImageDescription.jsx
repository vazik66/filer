import React from 'react';
import classes from './ImageDescription.module.css';

const ImageDescription = ({file}) => {
    return (
        <img
            className={classes.imageDescription}
            src={URL.createObjectURL(file)}
            alt=""
        />
    );
};

export default ImageDescription;