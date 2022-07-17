import React from 'react';
import {Outlet, useNavigate} from 'react-router-dom';
import classes from "./Layout.module.css";

const Layout = () => {
    const navigate = useNavigate();

    return (
        <div className={classes.layout}>
            <header>
                <h1
                    className={classes.h1}
                    onClick={() => navigate("/")}
                >
                    Filer
                </h1>
            </header>
            <Outlet />
            <footer>
                <a
                    className={classes.link}
                    href="https://github.com/vazik66/filer"
                    target="_blank"
                    rel="noreferrer"
                >
                    github.com/vazik66/filer
                </a>
            </footer>
        </div>
    );
};

export default Layout;