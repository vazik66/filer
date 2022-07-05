import React from 'react';
import classes from "./Main.module.css";
import FilePackList from "../components/FilePackList";

const Main = () => {
    return (
        <div className={classes.mainPage}>
            <h1>Filer</h1>
            <FilePackList />
        </div>
    );
};

export default Main;