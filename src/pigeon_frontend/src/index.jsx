import * as React from "react";
import { StrictMode } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createRoot } from "react-dom/client";
import AppLayout from "./components/Layout/AppLayout";
import Post from "./components/Post";
import Posts from "./components/Posts";
import Error from "./components/Error";
import User from "./components/User";
import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(

  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}>
        <Route index element={<Post />} />
        <Route path='/started' element={<Posts />} />
        <Route path='/coming-soon' element={<Error />} />
        <Route path='/user' element={<User />} />
        <Route path='/order' element={<Error />} />
      </Route>
    </Routes>
  </BrowserRouter>

);
