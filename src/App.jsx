import React from 'react';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import './App.module.css';
import Main from './pages/main/Main';
import Editor from './pages/editor/Editor';
import {getMyUserId} from './TestData/TestDataProvider';

const myUserId = getMyUserId();

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to={"/" + myUserId} />}/>
                <Route path="/:userId" element={<Navigate to={"/" + myUserId} />}/>
                <Route path={"/" + myUserId} element={<Main userId={myUserId} />} />
                <Route path={"/:userId/:packId"} element={<Editor />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;