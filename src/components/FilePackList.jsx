import React from 'react';
import classes from "./App.module.css";
import {v4 as uuid} from "uuid";

const FilePackList = ({filePacks}) => {
    return (
        <div className={classes.filePacks}>
            {filePacks.map(() => (
                <div
                    className={classes.e}
                    key={uuid()}
                />
            ))}
        </div>
    );
};

export default FilePackList;