import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Tasks from "./components/Tasks";
import "./App.css";
import axios from "axios";
import ProjectCard from "./components/ProjectCard";
import MainMenu from "./components/MainMenu";
import Home from "./components/Home";
function App() {
  // console.log(data);
  return (
    <div className="grid grid-cols-[1fr,4fr]">
      <BrowserRouter>
        <MainMenu />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/:id" element={<Tasks />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
