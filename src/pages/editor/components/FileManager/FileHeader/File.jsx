import React from 'react';
import classes from './File.module.css';
import FilenameInput from './FilenameInput';

const parseType = file => file.name.split('.').pop();

const File = ({file}) => {
    return (
        <div className={classes.file}>
            <FilenameInput file={file} />
            <div className={classes.type}>{parseType(file.value)}</div>
        </div>
    );
};

export default File;