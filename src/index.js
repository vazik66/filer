import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "./pages/main/Main";
import Editor from "./pages/editor/Editor";
import NoPage from "./pages/noPage/NoPage";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path="/" index element={<Main />} />
              <Route path="/editor" element={<Editor />} />
              <Route path="*" element={<NoPage />} />
          </Routes>
      </BrowserRouter>
  </React.StrictMode>
);