import React, {useState} from 'react';
import classes from "./File.module.css";
import FilenameInput from "./FilenameInput";

const File = ({file, setFile}) => {
    return (
        <div className={classes.file}>
            <FilenameInput
                file={file}
                setFile={setFile}
            />
            <div className={classes.type}>{file.type}</div>
        </div>
    );
};

export default File;