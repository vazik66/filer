import React from 'react';
import classes from "./Pack.module.css";

const Pack = ({pack}) => {
    return (
        <div
            className={classes.pack}
            onClick={() => alert(1)}
        >
            <div className={classes.text}>{pack.name}</div>
        </div>
    );
};

export default Pack;