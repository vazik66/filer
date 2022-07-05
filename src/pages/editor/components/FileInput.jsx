import React from 'react';
import classes from "./FileInput.module.css";

const FileInput = ({files, setFiles}) => {
    return (
        <label className={classes.fileInput}>
            <input
                className={classes.input}
                type="file"
                onChange={e => setFiles(files.concat([...e.target.files]))}
                multiple
            />
            <div className={classes.text}>
                Click to choose images, drag or paste them here
            </div>
        </label>
    );
};

export default FileInput;