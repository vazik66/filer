import React from 'react';
import classes from './FileInput.module.css';

const FileInput = ({addFiles}) => {
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