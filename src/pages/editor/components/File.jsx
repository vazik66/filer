import React from 'react';
import classes from './File.module.css';

const File = ({file, files, setFiles}) => {
    function deleteFile() {
        setFiles(files.filter(element => element !== file));
    }

    return (
        <div className={classes.file}>
            <p>{file.name}</p>
            <button onClick={deleteFile}>Delete</button>
        </div>
    );
};

export default File;