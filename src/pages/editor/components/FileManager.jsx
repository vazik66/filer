import React from 'react';
import classes from "./FileManager.module.css";
import File from "./File";
import FileInput from "./FileInput";

const filesInPackLimit = 5;

const FileManager = ({files, setFiles, addFiles}) => {
    return (
        <div className={classes.fileManager}>
            <h2>File Manager</h2>
            {files.map(file => <File file={file} files={files} setFiles={setFiles} />)}
            {files.length < filesInPackLimit && <FileInput addFiles={addFiles} />}
        </div>
    );
};

export default FileManager;