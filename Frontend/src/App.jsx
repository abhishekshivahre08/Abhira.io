import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home/homePage';
export const serverUrl = "http://localhost:8000";
import useGetCurrentUser from './hooks/useGetCurrentUser';
import { useSelector } from 'react-redux';
import Dashboard from './pages/home/Dashboard';
import Genrate from './pages/home/Genrate';
import { Navigate } from 'react-router-dom';

function App() {
useGetCurrentUser();
const {userData} = useSelector(state=>state.user)
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={ userData?<Dashboard />:<Home/>} />
           <Route path="/genrate" element={ userData?<Genrate />:<Home />} />


      </Routes>
    </BrowserRouter>
  );

}

export default App
