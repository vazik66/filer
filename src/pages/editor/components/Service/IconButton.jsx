import React from 'react';
import classes from './IconButton.module.css';

const IconButton = ({image, onClick, style, show}) => {
    return (
        <button
            className={classes.button}
            style={{...style, ...{display: show ? "flex" : "none"}}}
            onClick={onClick}
        >
            <img className={classes.img} src={image} alt="" draggable="false" />
        </button>
    );
};

export default IconButton;