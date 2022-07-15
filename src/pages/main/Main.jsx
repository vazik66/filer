import React from 'react';
import classes from "./Main.module.css";
import PackList from "./components/PackList";

const Main = ({userId}) => {
    return (
        <div>
            <h1>Filer</h1>
            <PackList userId={userId} />
        </div>
    );
};

export default Main;