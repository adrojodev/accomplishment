import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainApp from "./pages/MainApp";
import Editor from "./pages/Editor";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    document.body.style.height = "-webkit-fill-available";
    document.body.style.height = "fill-available";
    document.body.style.height = "-moz-available";
    document.documentElement.style.height = "-webkit-fill-available";
    document.documentElement.style.height = "fill-available";
    document.documentElement.style.height = "-moz-available";
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="/editor" element={<Editor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
