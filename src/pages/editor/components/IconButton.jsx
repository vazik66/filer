import React from 'react';
import classes from './IconButton.module.css';

const IconButton = ({image, onClick, show}) => {
    return (
        <button
            className={classes.button}
            style={{display: show ? "flex" : "none"}}
            onClick={onClick}
        >
            <img className={classes.img} src={image} alt="" />
        </button>
    );
};

export default IconButton;