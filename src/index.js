import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "./pages/Main";
import Editor from "./pages/Editor";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path="/" index element={<Main />} />
              <Route path="/editor" index element={<Editor />} />
          </Routes>
      </BrowserRouter>
  </React.StrictMode>
);