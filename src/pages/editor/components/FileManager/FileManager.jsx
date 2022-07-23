import React, {useContext} from 'react';
import classes from './FileManager.module.css';
import FileInput from './FileInput';
import {FilesContext} from "../../../../context/context";
import FileDescription from "./FileDescription/FileDescription";
import FileHeader from "./FileHeader/FileHeader";

const FileManager = ({show}) => {
    const {files} = useContext(FilesContext);

    return (
        <div
            className={classes.fileManager}
            style={{display: show ? "flex" : "none"}}
        >
            {files.map(file => (
                <div key={file.id} className={classes.panel}>
                    <FileHeader file={file} />
                    <FileDescription file={file} />
                </div>
            ))}
            <FileInput hidden={false} />
        </div>
    );
};

export default FileManager;