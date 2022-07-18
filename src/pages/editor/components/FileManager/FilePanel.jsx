import React, {useEffect, useState} from 'react';
import classes from './FilePanel.module.css';
import FileHeader from './FileHeader/FileHeader';
import FileDescription from './FileDescription/FileDescription';

const FilePanel = ({file, download, remove, replace}) => {
    const [description, setDescription] = useState(false);

    return (
        <div className={classes.filePanel}>
            <FileHeader
                file={file}
                download={download}
                remove={remove}
                toggleDescription={() => setDescription(!description)}
                replace={replace}
            />
            <FileDescription file={file} show={description} />
        </div>
    );
};

export default FilePanel;