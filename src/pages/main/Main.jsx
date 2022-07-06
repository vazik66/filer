import React from 'react';
import classes from "./Main.module.css";
import PackList from "./components/PackList";

const Main = () => {
    return (
        <div className={classes.main}>
            <h1>Filer</h1>
            <PackList />
        </div>
    );
};

export default Main;