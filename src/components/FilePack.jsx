import React from 'react';
import classes from "./FilePack.module.css";

const FilePack = ({pack}) => {
    return (
        <div
            className={classes.pack}
            onClick={() => alert(1)}
        >
            <p>{pack.name}</p>
        </div>
    );
};

export default FilePack;