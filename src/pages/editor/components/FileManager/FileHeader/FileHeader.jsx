import React from 'react';
import classes from './FileHeader.module.css';
import FileButton from './FileButton';
import File from './File';
import svgSave from '../../../../../icons/save.svg';
import svgDelete from '../../../../../icons/delete.svg';
import svgExpand from '../../../../../icons/newExpand.svg';

const fileTypesToShow = ['text/plain', 'image/jpeg', 'image/png'];

const FileHeader = ({file, download, remove, toggleDescription, replace}) => {
    return (
        <div className={classes.fileHeader}>
            <FileButton
                image={svgSave}
                onClick={() => download(file)}
                style={{margin: "auto 15px auto 0"}}
            />
            <File file={file} replace={replace} />
            <FileButton
                image={svgExpand}
                onClick={toggleDescription}
                style={{
                    margin: "auto auto auto 15px",
                    display: fileTypesToShow.includes(file.type) ? "flex" : "none"
                }}
            />
            <FileButton
                image={svgDelete}
                onClick={() => remove(file)}
                style={{margin: "auto 0 auto auto"}}
            />
        </div>
    );
};

export default FileHeader;