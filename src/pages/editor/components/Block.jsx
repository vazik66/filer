import React from 'react';
import classes from "./Block.module.css";

const Block = ({image, text}) => {
    return (
        <div className={classes.block}>
            <p className={classes.text}>{text}</p>
        </div>
    );
};

export default Block;