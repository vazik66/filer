import React from 'react';
import classes from './FilePanel.module.css';
import FileHeader from './FileHeader/FileHeader';
import FileDescription from './FileDescription/FileDescription';
import {useFile} from "../../../../hooks/useFile";

const FilePanel = ({mapFile, remove}) => {
    const file = useFile(mapFile);

    return (
        <div className={classes.filePanel}>
            <FileHeader file={file} remove={remove} />
            <FileDescription file={file} />
        </div>
    );
};

export default FilePanel;