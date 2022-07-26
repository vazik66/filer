import {useState} from 'react';

export const useViews = maxViews => {
    const [value, setValue] = useState(0);
    const [max, setMax] = useState(maxViews);

    const changeMax = number => setMax((number < 0 || number > 999999) ? -1 : number);

    const format = () => value + ' / ' + ((max === -1) ? '∞' : max);

    return {value, max, changeMax, format};
};