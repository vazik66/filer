import React, {useEffect, useState} from 'react';
import classes from './FilePanel.module.css';
import {saveAs} from 'file-saver';
import FileHeader from './FileHeader/FileHeader';
import FileDescription from './FileDescription/FileDescription';

const FilePanel = ({file, files, setFiles}) => {
    const [currentFile, setCurrentFile] = useState(file);
    const [description, setDescription] = useState(false);

    useEffect(() => {
        setFiles(getFilesExceptOne().concat(currentFile));
    }, [currentFile]);

    const getFilesExceptOne = () => files.filter(element => element !== file);

    const methods = {
        downloadFile: () => saveAs(currentFile, currentFile.name),
        toggleDescription: () => setDescription(!description),
        deleteFile: () => setFiles(getFilesExceptOne()),
    };

    return (
        <div className={classes.filePanel}>
            <FileHeader
                methods={methods}
                currentFile={currentFile}
                setCurrentFile={setCurrentFile}
            />
            <FileDescription
                file={currentFile}
                type={currentFile.type}
                show={description}
            />
        </div>
    );
};

export default FilePanel;