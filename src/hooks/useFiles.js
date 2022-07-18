import {useEffect, useState} from "react";
import {saveAs} from 'file-saver';

const filesInPackLimit = 5;

const isDirectory = maybeFile => !maybeFile.type && maybeFile.size % 4096 === 0;

export const useFiles = (initialState=[]) => {
    const [value, setValue] = useState(initialState);

    const add = newFiles => {
        const fileNames = value.map(file => file.name);
        const result = newFiles.filter(file =>
            !fileNames.includes(file.name) && !isDirectory(file));
        setValue(value.concat(result).slice(0, filesInPackLimit));
    };

    const download = file => saveAs(file, file.name);

    const remove = file => setValue(value.filter(vFile => vFile.name !== file.name));

    const replace = (a, b) => {
        const newFiles = value.map(file =>
            file.name === a.name ? b : file);
        setValue(newFiles);
    };

    return {value, add, download, remove, replace};
};