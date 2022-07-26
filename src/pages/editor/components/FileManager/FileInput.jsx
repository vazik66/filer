import React, {useContext} from 'react';
import classes from './FileInput.module.css';
import {FilesContext} from "../../../../context/context";

const FileInput = ({hidden}) => {
    const {add} = useContext(FilesContext);

    const addFiles = e => {
        [...e.target.files].forEach(file => add(file));
        e.target.value = "";
    };

    return (
        <label className={classes.fileInput} style={{display: hidden ? "none" : null}}>
            <input
                className={classes.input}
                type="file"
                onChange={addFiles}
                multiple
            />
            <div className={classes.text}>
                Click to add files or paste them
            </div>
        </label>
    );
};

export default FileInput;