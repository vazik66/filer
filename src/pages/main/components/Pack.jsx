import React from 'react';
import classes from "./Pack.module.css";

const Pack = ({pack}) => {
    return (
        <div
            className={classes.pack}
        >
            <a className={classes.text} href={pack.href}>{pack.name}</a>
        </div>
    );
};

export default Pack;