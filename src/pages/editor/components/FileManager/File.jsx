import React, {useState} from 'react';
import classes from "./File.module.css";
import FilenameInput from "./FilenameInput";

const clearFileType = fileType => fileType.split('/')[1];

const File = ({file, setFile}) => {
    return (
        <div className={classes.file}>
            <FilenameInput
                file={file}
                setFile={setFile}
            />
            <div className={classes.type}>{clearFileType(file.type)}</div>
        </div>
    );
};

export default File;