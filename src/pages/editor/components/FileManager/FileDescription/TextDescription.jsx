import React, {useEffect, useState} from 'react';
import classes from './TextDescription.module.css';

const TextDescription = ({file}) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const reader = new FileReader();
        reader.onload = async e => setData(e.target.result);
        reader.readAsText(file);
    });

    return (
        <div className={classes.textDescription}>
            {data}
        </div>
    );
};

export default TextDescription;