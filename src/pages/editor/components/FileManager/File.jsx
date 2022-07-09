import React, {useState} from 'react';
import classes from "./File.module.css";
import FilenameInput from "./FilenameInput";

// function getClearFileType(rawType) {
//     return rawType.split('/')[1];
// }

const File = ({file, setFile}) => {
    const [fileType, setFileType] = useState(file.type);

    return (
        <div className={classes.file}>
            <FilenameInput
                file={file}
                setFile={setFile}
                fileType={fileType}
                setFileType={setFileType}
            />
            <div className={classes.type}>{fileType}</div>
        </div>
    );
};

export default File;