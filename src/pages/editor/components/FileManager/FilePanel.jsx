import React, {useEffect, useState} from 'react';
import classes from './FilePanel.module.css';
import File from './File';
import FileButton from './FileButton';
import {saveAs} from 'file-saver';
import svgSave from '../../../../icons/save.svg';
import svgDelete from '../../../../icons/delete.svg';

const FilePanel = ({file, files, setFiles}) => {
    const [currentFile, setCurrentFile] = useState(file);

    useEffect(() => {
        setFiles(getFilesExceptOne().concat(currentFile));
    }, [currentFile]);

    const deleteFile = () => setFiles(getFilesExceptOne());
    const downloadFile = () => saveAs(currentFile, currentFile.name);
    const getFilesExceptOne = () => files.filter(element => element !== file);

    return (
        <div className={classes.filePanel}>
            <FileButton
                image={svgSave}
                onClick={downloadFile}
                style={{margin: "auto 15px auto 0"}}
            />
            <File file={currentFile} setFile={setCurrentFile} />
            <FileButton
                image={svgDelete}
                onClick={deleteFile}
                style={{margin: "auto 0 auto auto"}}
            />
        </div>
    );
};

export default FilePanel;