import React, {useReducer, useState, createContext, useEffect} from 'react';
import {reducer} from './reducer';
import {saveAs} from 'file-saver';
import JSZip from 'jszip';
import {useViews} from '../hooks/useViews';
import {useSize} from "../hooks/useSize";

const filesToExpand = ['text/plain', 'image/jpeg', 'image/png',
    'video/mp4', 'video/mov', 'video/ogv', 'video/webm'];

export const FilesContext = createContext(null);

export const Provider = ({children}) => {
    const [files, dispatch] = useReducer(reducer, []);
    const size = useSize(4000000);
    const views = useViews(-1);
    const [password, setPassword] = useState(null);
    const [time, setTime] = useState(null);

    useEffect(() => size.recalculate(files), [files]);

    const value = {
        files: files,
        add: file => dispatch({
            type: 'add',
            payload: {
                value: file,
                canShow: filesToExpand.includes(file.type),
                hidden: true,
                maxSize: size.max
            }
        }),
        remove: id => dispatch({
            type: 'remove',
            payload: {id: id, maxSize: size.max}
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
            const file = files.find(file => file.id === id);
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

        maxSize: size.max,
        addFilesButtonShow: size.value < size.max,
        getSizeString: size.format
    };

    return (
        <FilesContext.Provider value={value}>{children}</FilesContext.Provider>
    );
};

