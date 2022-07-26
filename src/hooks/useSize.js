import {useState} from "react";

const formatBytes = (bytes, decimals=2) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

export const useSize = maxSize => {
    const [value, setValue] = useState(0);
    const [max, setMax] = useState(maxSize);

    const recalculate = files => setValue(files.map(file => file.value.size)
        .reduce((a, b) => a + b, 0));

    const format = () => formatBytes(value) + ' / ' + formatBytes(max);

    return {value, max, format, recalculate};
};