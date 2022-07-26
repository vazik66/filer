import React, {useContext} from 'react';
import classes from './FileHeader.module.css';
import FileButton from './FileButton';
import File from './File';
import svgSave from '../../../../../icons/save.svg';
import svgDelete from '../../../../../icons/delete.svg';
import svgExpand from '../../../../../icons/newExpand.svg';
import {FilesContext} from "../../../../../context/context";

const FileHeader = ({file}) => {
    const {save, remove, toggleHidden} = useContext(FilesContext);

    return (
        <div className={classes.fileHeader}>
            <FileButton
                image={svgSave}
                onClick={() => save(file.id)}
                style={{margin: "auto 15px auto 0"}}
            />
            <File file={file} />
            <FileButton
                image={svgExpand}
                onClick={() => toggleHidden(file.id)}
                style={{
                    margin: "auto auto auto 15px",
                    display: !file.canShow ? "none" : null
                }}
            />
            <FileButton
                image={svgDelete}
                onClick={() => remove(file.id)}
                style={{margin: "auto 0 auto auto"}}
            />
        </div>
    );
};

export default FileHeader;