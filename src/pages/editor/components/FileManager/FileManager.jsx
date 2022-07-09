import React from 'react';
import classes from './FileManager.module.css';
import FilePanel from './FilePanel';
import FileInput from './FileInput';

const filesInPackLimit = 5;

const FileManager = ({files, setFiles, addFiles, show}) => {
    return (
        <div
            className={classes.fileManager}
            style={{display: show ? "flex" : "none"}}
        >
            {files.map(file => <FilePanel file={file} files={files} setFiles={setFiles} />)}
            {files.length < filesInPackLimit && <FileInput addFiles={addFiles} />}
        </div>
    );
};

export default FileManager;