import React from 'react';
import classes from './File.module.css';
import FilenameInput from './FilenameInput';

const File = ({file}) => {
    return (
        <div className={classes.file}>
            <FilenameInput file={file} />
            <div className={classes.type}>{file.parseType()}</div>
        </div>
    );
};

export default File;