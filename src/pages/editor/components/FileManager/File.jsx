import React from 'react';
import classes from './File.module.css';
import FilenameInput from './FilenameInput';

const getFileType = fileName => fileName.split('.').pop();

const File = ({file, setFile}) => {
    return (
        <div className={classes.file}>
            <FilenameInput file={file} setFile={setFile} />
            <div className={classes.type}>{getFileType(file.name)}</div>
        </div>
    );
};

export default File;