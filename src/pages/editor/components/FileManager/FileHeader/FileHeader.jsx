import React from 'react';
import classes from './FileHeader.module.css';
import FileButton from './FileButton';
import File from './File';
import svgSave from '../../../../../icons/save.svg';
import svgDelete from '../../../../../icons/delete.svg';
import svgExpand from '../../../../../icons/expand.svg';

const fileTypesToShow = ['text/plain', 'image/jpeg', 'image/png'];

const FileHeader = ({methods, currentFile, setCurrentFile}) => {
    return (
        <div className={classes.fileHeader}>
            <FileButton
                image={svgSave}
                onClick={methods.downloadFile}
                style={{margin: "auto 15px auto 0"}}
            />
            <File file={currentFile} setFile={setCurrentFile} />
            <FileButton
                image={svgExpand}
                onClick={methods.toggleDescription}
                style={{
                    margin: "auto auto auto 15px",
                    display: fileTypesToShow.includes(currentFile.type) ? "flex" : "none"
                }}
            />
            <FileButton
                image={svgDelete}
                onClick={methods.deleteFile}
                style={{margin: "auto 0 auto auto"}}
            />
        </div>
    );
};

export default FileHeader;