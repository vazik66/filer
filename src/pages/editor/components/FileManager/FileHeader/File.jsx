import React from 'react';
import classes from './File.module.css';
import FilenameInput from './FilenameInput';

const getFileType = fileName => fileName.split('.').pop();

const File = ({file, replace}) => {
    return (
        <div className={classes.file}>
            <FilenameInput file={file} replace={replace} />
            <div className={classes.type}>{getFileType(file.name)}</div>
        </div>
    );
};

export default File;