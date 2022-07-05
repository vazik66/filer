import React, {useState} from 'react';
import classes from "./FileManager.module.css";
import File from "./File";
import FileInput from "./FileInput";

const filesInPackLimit = 5;

const FileManager = () => {
    const [files, setFiles] = useState([]);

    return (
        <div className={classes.fileManager}>
            {files.map(file => <File file={file} files={files} setFiles={setFiles} />)}
            {files.length < filesInPackLimit && <FileInput files={files} setFiles={setFiles} />}
        </div>
    );
};

export default FileManager;