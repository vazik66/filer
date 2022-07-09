import React from 'react';
import classes from './FileButton.module.css';

const FileButton = ({image, onClick, style}) => {
    return (
        <button
            className={classes.button}
            onClick={onClick}
            style={style}
        >
            <img className={classes.img} src={image} alt="" draggable="false" />
        </button>
    );
};

export default FileButton;