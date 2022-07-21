import React from 'react';
import classes from './FileHeader.module.css';
import FileButton from './FileButton';
import File from './File';
import svgSave from '../../../../../icons/save.svg';
import svgDelete from '../../../../../icons/delete.svg';
import svgExpand from '../../../../../icons/newExpand.svg';

const fileTypesToShow = ['text/plain', 'image/jpeg', 'image/png',
    'video/mp4', 'video/mov', 'video/ogv', 'video/webm'];

const FileHeader = ({file, remove}) => {
    return (
        <div className={classes.fileHeader}>
            <FileButton
                image={svgSave}
                onClick={file.download}
                style={{margin: "auto 15px auto 0"}}
            />
            <File file={file} />
            <FileButton
                image={svgExpand}
                onClick={file.toggleExtended}
                style={{
                    margin: "auto auto auto 15px",
                    display: fileTypesToShow.includes(file.value.type)
                        ? "flex" : "none"
                }}
            />
            <FileButton
                image={svgDelete}
                onClick={() => remove(file.value)}
                style={{margin: "auto 0 auto auto"}}
            />
        </div>
    );
};

export default FileHeader;