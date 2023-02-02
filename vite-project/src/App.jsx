import { useEffect, useState, useContext } from "react";
import { AppContext } from "./context/ChatAppContext";
import { Route, Routes } from "react-router-dom";
import Users from "./pages/Users";
import Home from "./pages/Home";
import Filter from "./components/Filter";

const App = () => {
  const {} = useContext(AppContext);

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/allusers" element={<Users />} />
      </Routes>
    </div>
  );
};

export default App;
