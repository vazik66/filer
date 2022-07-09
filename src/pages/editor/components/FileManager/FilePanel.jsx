import React, {useEffect, useState} from 'react';
import classes from './FilePanel.module.css';
import File from './File';
import FileButton from './FileButton';
import {saveAs} from 'file-saver';

import svgSave from '../../../../icons/save.svg';
import svgDelete from '../../../../icons/delete.svg';

const FilePanel = ({file, files, setFiles}) => {
    const [currentFile, setCurrentFile] = useState(file);
    useEffect(() => console.log(currentFile.name), [currentFile]);

    const deleteFile = () => setFiles(files.filter(element => element !== file));
    const downloadFile = () => saveAs(file, file.name);

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