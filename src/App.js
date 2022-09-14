import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Korzina from './pages/Korzina';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/Korzina' element={<Korzina/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
