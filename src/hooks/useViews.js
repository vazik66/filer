import {useEffect, useState} from 'react';

const formatNumber = (number) => {
    if (number < 1000) return number;
    const k = 1000;
    const sizes = ['', ' K', ' M', ' B'];
    const i = Math.floor(Math.log(number) / Math.log(k));
    const result = parseFloat((number / Math.pow(k, i)).toFixed(2));
    return result + sizes[i];
};

export const useViews = (maxViews) => {
    const [value, setValue] = useState(0);
    const [max, setMax] = useState(maxViews);

    useEffect(() => {
        if (max < 0 || max > 1000000000) setMax(-1);
    }, [max]);

    const format = () => formatNumber(value) + ' / ' +
        ((max === -1) ? '∞' : formatNumber(max));

    return {setMax, format};
};