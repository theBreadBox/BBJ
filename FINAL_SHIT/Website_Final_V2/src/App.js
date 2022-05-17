import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Mint from './pages/mint.js'






function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Mint/>} exact />
      </Routes>
    </Router>
  );
}

export default App;
