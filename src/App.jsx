import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Main from './pages/main/Main';
import Editor from './pages/editor/Editor';
import NoPage from './pages/noPage/NoPage';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" index element={<Main />} />
                <Route path="/editor" element={<Editor />} />
                <Route path="*" element={<NoPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;