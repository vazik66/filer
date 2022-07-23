import React, {createContext} from 'react';
import {reducer} from "./reducer";
import {saveAs} from 'file-saver';

const filesToExpand = ['text/plain', 'image/jpeg', 'image/png',
    'video/mp4', 'video/mov', 'video/ogv', 'video/webm'];

export const FilesContext = createContext(null);

export const Provider = ({ children }) => {
    const [state, dispatch] = React.useReducer(reducer, []);

    const getFileById = id => state.find(file => file.id === id);

    const value = {
        files: state,
        add: file => {
            dispatch({
                type: 'add',
                payload: {
                    value: file,
                    canShow: filesToExpand.includes(file.type),
                    hidden: true
                }
            });
        },
        save: id => {
            const file = getFileById(id);
            saveAs(file.value, file.value.name);
        },
        remove: id => {
            dispatch({
                type: 'remove',
                payload: {id: id}
            });
        },
        toggleHidden: id => {
            dispatch({
                type: 'toggleHidden',
                payload: {id: id}
            });
        },
        changeName: (id, name) => {
            dispatch({
                type: 'changeName',
                payload: {id: id, name: name}
            });
        },
    };

    return (
        <FilesContext.Provider value={value}>{children}</FilesContext.Provider>
    );
};

