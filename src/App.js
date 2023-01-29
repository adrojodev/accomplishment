import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainApp from "./pages/MainApp";
import Editor from "./pages/Editor";

function App() {
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
