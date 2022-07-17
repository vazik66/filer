import React from 'react';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import './App.module.css';
import Main from '../pages/main/Main';
import Editor from '../pages/editor/Editor';
import Layout from './Layout';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Main />}/>
                    <Route path=":userId" element={<Navigate to="/" />}/>
                    <Route path={":userId/:packId"} element={<Editor />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;