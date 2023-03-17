import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import AddBook from "./components/AddBook/AddBook";
import EditBook from "./components/EditBook/EditBook";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddBook />} />
        <Route path="/edit/:bookId" element={<EditBook />} />
      </Routes>
    </Router>
  );
}

export default App;
