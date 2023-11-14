import "./App.css";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Dashboard from "./components/Dashboard/Dashboard";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthRoute from './AuthRoute';
import React from 'react';
import Ngo from "./components/Dashboard/Ngo";
import Farmer from "./components/Dashboard/Farmer";
import Composter from "./components/Dashboard/Composter";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path='/' element={<AuthRoute />}>

            <Route index element={<Dashboard />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/ngo" element={<Ngo />} />
            <Route path="/composter" element={<Composter />} />
            <Route path="/farmer" element={<Farmer />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
