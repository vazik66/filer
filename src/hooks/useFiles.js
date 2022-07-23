import {useEffect, useReducer, useState} from 'react';
import {useSize} from './useSize';
import {saveAs} from 'file-saver';
import JSZip from 'jszip';
import {File} from '../customClasses/File';
import {reducer} from '../context/reducer';

const isDirectory = maybeFile => !maybeFile.type && maybeFile.size % 4096 === 0;

export const useFiles = (initialState=[], maxSize) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [value, setValue] = useState(initialState);
    const size = useSize(maxSize);
    const [showInput, setShowInput] = useState(true);

    const add = newFiles => {
        const filteredFiles = newFiles.filter(file => !isDirectory(file));
        const result = [];
        filteredFiles.forEach(file => {
            if (size.canAddFile(file.size)) {
                result.push(new File(file));
                size.add(file.size);
            }
        });
        setValue(value.concat(result));
    };








    useEffect(() => {
        size.recalculate(value);
        setShowInput(size.canAdd());
    }, [value]);

    const remove = fileId => {
        let filesCopy = {...value};
        delete filesCopy[fileId];
        setValue(filesCopy);
    };





    const downloadAll = () => {
        if (!value.length) return;
        const zip = new JSZip();
        value.forEach(file => zip.file(file.name, file))
        zip.generateAsync({type:'blob'}).then(content =>
            saveAs(content, 'filer.zip'));
    };

    return {value, showInput, size, add, remove, downloadAll};
};