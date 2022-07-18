import React, {useEffect, useState} from 'react';
import classes from './FilePanel.module.css';
import {saveAs} from 'file-saver';
import FileHeader from './FileHeader/FileHeader';
import FileDescription from './FileDescription/FileDescription';

const FilePanel = ({file, download, remove}) => {
    // const [currentFile, setCurrentFile] = useState(file);
    const [description, setDescription] = useState(false);
    //
    // useEffect(() => {
    //     setFiles(getFilesExceptOne().concat(currentFile));
    // }, [currentFile]);
    //
    // const getFilesExceptOne = () => files.filter(element => element !== currentFile);

    return (
        <div className={classes.filePanel}>
            <FileHeader
                file={file}
                download={download}
                remove={remove}
                toggleDescription={() => setDescription(!description)}
            />
            <FileDescription file={file} show={description} />
        </div>
    );
};

export default FilePanel;