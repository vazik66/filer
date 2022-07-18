import {useState} from 'react';

export const useViews = (maxViews) => {
    const [value, setValue] = useState(0);
    const [max, setMax] = useState(maxViews);

    const format = () => value + ' / ' + (max < 0 ? '∞' : max);

    return {setMax, format};
};