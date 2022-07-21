import {useState} from "react";
import {saveAs} from 'file-saver';

export const useFile = (initialState) => {
    const [value, setValue] = useState(initialState);
    const [extended, setExtended] = useState(false);

    const changeName = newName => {
        setValue(new File([value],
            newName + '.' + parseType(), {type: value.type}));
    };

    const toggleExtended = () => setExtended(!extended);

    const parseType = () => value.name.split('.').pop();

    const parseName = () => value.name.split('.').slice(0, -1).join('.');

    const download = () => saveAs(value, value.name);

    return {value, extended, changeName, download,
        toggleExtended, parseType, parseName};
};