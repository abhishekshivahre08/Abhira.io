import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home/homePage';
export const serverUrl = "https://abhira-io.onrender.com";
import useGetCurrentUser from './hooks/useGetCurrentUser';
import { useSelector } from 'react-redux';
import Dashboard from './pages/home/Dashboard';
import Genrate from './pages/home/Genrate';
import Editor from './pages/home/Editor';
import { Navigate } from 'react-router-dom';
import Editors from './pages/home/Editor';
import LiveSitePage from './pages/home/liveSitePage';
import Pricing from './pages/home/Pricing';

function App() {
  useGetCurrentUser();
  const { userData } = useSelector(state => state.user)
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={userData ? <Dashboard /> : <Home />} />
        <Route path="/genrate" element={userData ? <Genrate /> : <Home />} />
        <Route path="/editor/:id" element={userData ? <Editors /> : <Home />} />
        <Route path="/site/:id" element={<LiveSitePage />} />
        <Route path="/pricing" element={<Pricing />} />


      </Routes>
    </BrowserRouter>
  );

}

export default App
