import React from 'react';
import classes from "./Block.module.css";

const Block = ({image, text}) => {
    return (
        <div className={classes.block}>
            {text}
        </div>
    );
};

export default Block;