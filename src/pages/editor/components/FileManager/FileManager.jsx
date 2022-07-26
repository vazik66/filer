import React, {useContext} from 'react';
import classes from './FileManager.module.css';
import FileInput from './FileInput';
import {FilesContext} from "../../../../context/context";
import FileDescription from "./FileDescription/FileDescription";
import FileHeader from "./FileHeader/FileHeader";

const FileManager = ({hidden}) => {
    const {files, addFilesButtonShow} = useContext(FilesContext);

    return (
        <div
            className={classes.fileManager}
            style={{display: hidden ? "none" : null}}
        >
            {files.map(file => (
                <div
                    key={file.id}
                    style={{boxShadow: file.willBeSent ? null : "inset 0px 0px 0px 4px red"}}
                    className={classes.panel}
                >
                    <FileHeader file={file} />
                    <FileDescription file={file} />
                </div>
            ))}
            <FileInput hidden={!addFilesButtonShow} />
        </div>
    );
};

export default FileManager;