import { useEffect, useState, useContext } from "react";
import { AppContext } from "./context/ChatAppContext";
import { Route, Routes } from "react-router-dom";
import Users from "./pages/Users";
import Home from "./pages/Home";
import Filter from "./components/Filter";
import Chat from "./components/Chat";

const App = () => {
  const {} = useContext(AppContext);

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/allusers" element={<Users />} />
        <Route path="/:id" element={<Chat />} />
      </Routes>
    </div>
  );
};

export default App;
