import React from 'react';
import {Outlet} from 'react-router-dom';
import classes from "../pages/editor/Editor.module.css";

const Layout = () => {
    return (
        <div>
            <header>
                <a className={classes.h1} href="/">Filer</a>
            </header>
            <Outlet />
            <footer>
                <a
                    className={classes.link}
                    href="https://github.com/vazik66/filer"
                    target="_blank" rel="noreferrer"
                >
                    github.com/vazik66/filer
                </a>
            </footer>
        </div>
    );
};

export default Layout;