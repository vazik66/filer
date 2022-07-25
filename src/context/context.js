import React, {useReducer, useState, createContext, useEffect} from 'react';
import {reducer} from './reducer';
import {saveAs} from 'file-saver';
import JSZip from 'jszip';
import {useViews} from '../hooks/useViews';

const filesToExpand = ['text/plain', 'image/jpeg', 'image/png',
    'video/mp4', 'video/mov', 'video/ogv', 'video/webm'];

const formatBytes = (bytes, decimals=2) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

export const FilesContext = createContext(null);

export const Provider = ({children}) => {
    const [files, dispatch] = useReducer(reducer, []);
    const [currentSize, setCurrentSize] = useState(0);
    const [maxSize, setMaxSize] = useState(4000000);
    const views = useViews(-1);
    const [password, setPassword] = useState(null);
    const [time, setTime] = useState(null);

    useEffect(() => setCurrentSize(files.map(file => file.value.size)
        .reduce((a, b) => a + b, 0)), [files]);

    const getFileById = id => files.find(file => file.id === id);

    const value = {
        files: files,
        add: file => dispatch({
            type: 'add',
            payload: {
                value: file,
                canShow: filesToExpand.includes(file.type),
                hidden: true,
                maxSize: maxSize
            }
        }),
        remove: id => dispatch({
            type: 'remove',
            payload: {id: id, maxSize: maxSize}
        }),
        toggleHidden: id => dispatch({
            type: 'toggleHidden',
            payload: {id: id}
        }),
        changeName: (id, name) => dispatch({
            type: 'changeName',
            payload: {id: id, name: name}
        }),
        save: id => {
            const file = getFileById(id);
            saveAs(file.value, file.value.name);
        },
        saveAll: () => {
            const filteredFiles = files.filter(file => file.willBeSent);
            if (!filteredFiles.length) return;
            const zip = new JSZip();
            filteredFiles.forEach(file => zip.file(file.value.name, file.value));
            zip.generateAsync({type:'blob'}).then(content =>
                saveAs(content, 'filer.zip'));
        },

        getViewsString: views.format,
        changeMaxViews: views.changeMax,

        changePassword: setPassword,

        time: time,
        changeTime: setTime,

        maxSize: maxSize,
        addFilesButtonShow: currentSize < maxSize,
        getSizeString: () => formatBytes(currentSize) + ' / ' + formatBytes(maxSize)
    };

    return (
        <FilesContext.Provider value={value}>{children}</FilesContext.Provider>
    );
};

