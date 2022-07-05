import React from 'react';
import classes from "./FileInput.module.css";

const filesInPackLimit = 5;

const FileInput = ({files, setFiles}) => {
    function addFiles(newFiles) {
        const fileNames = files.map(file => file.name);
        const result = newFiles.filter(file => !fileNames.includes(file.name));
        setFiles(files.concat(result).slice(0, filesInPackLimit));
    }

    return (
        <label className={classes.fileInput}>
            <input
                className={classes.input}
                type="file"
                onChange={e => addFiles([...e.target.files])}
                multiple
            />
            <div className={classes.text}>
                Click to choose images, drag or paste them here
            </div>
        </label>
    );
};

export default FileInput;