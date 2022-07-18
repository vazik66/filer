import React from 'react';
import classes from './FileManager.module.css';
import FilePanel from './FilePanel';
import FileInput from './FileHeader/FileInput';

const FileManager = ({files, show}) => {
    return (
        <div
            className={classes.fileManager}
            style={{display: show ? "flex" : "none"}}
        >
            {files.value.map(file => <FilePanel
                key={file.name}
                file={file}
                remove={files.remove}
                download={files.download}
                replace={files.replace}
            />)}
            {/*{files.showAddButton() && <FileInput addFiles={files.add} />}*/}
            <FileInput addFiles={files.add} />
        </div>
    );
};

export default FileManager;