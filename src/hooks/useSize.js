import {useState} from 'react';

export const useSize = (max) => {
    const [value, setValue] = useState(0);
    const [maxSize, setMaxSize] = useState(max);

    const canAdd = () => value < maxSize;

    const canAddFile = fileSize => value + fileSize < maxSize

    const recalculate = files => {
        if (!files) return;
        const sizes = files.map(file => file.size);
        const sum = sizes.reduce((a, b) => a + b, 0);
        setValue(sum);
    };

    return {value, canAdd, canAddFile, recalculate};
};