import {useEffect, useState} from 'react';
import {useSize} from './useSize';
import {saveAs} from 'file-saver';
import JSZip from 'jszip';

const isDirectory = maybeFile => !maybeFile.type && maybeFile.size % 4096 === 0;

export const useFiles = (initialState=[], maxSize) => {
    const [value, setValue] = useState(initialState);
    const size = useSize(maxSize);
    const [showInput, setShowInput] = useState(true);

    useEffect(() => {
        size.recalculate(value);
        setShowInput(size.canAdd());
    }, [value]);

    const add = newFiles => {
        const filesNames = value.map(file => file.name);
        const filteredFiles = newFiles.filter(file =>
            !filesNames.includes(file.name) && !isDirectory(file));
        const result = [];
        filteredFiles.forEach(file => {
            if (size.canAddFile(file.size)) {
                result.push(file);
                size.add(file.size);
            }
        });
        setValue(value.concat(result));
    };

    const remove = file => setValue(value.filter(vFile => vFile.name !== file.name));

    const replace = (a, b) => {
        const newFiles = value.map(file =>
            file.name === a.name ? b : file);
        setValue(newFiles);
    };

    const downloadAll = () => {
        if (!value.length) return;
        const zip = new JSZip();
        value.forEach(file => zip.file(file.name, file))
        zip.generateAsync({type:'blob'}).then(content =>
            saveAs(content, 'filer.zip'));
    };

    return {value, showInput, size, add, remove, replace, downloadAll};
};