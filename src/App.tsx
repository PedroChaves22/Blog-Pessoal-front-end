import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';



import Footer from './componentes/estaticos/footer/Footer';
import Navbar from './componentes/estaticos/navbar/Navbar';
import Home from './paginas/home/Home';
import Login from './paginas/login/login';

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ minHeight: '100vh'}}>
        <Routes>
          <Route  path="/" element= { <Login />} />
          <Route  path="/login" element= { <Login />} />
          <Route  path="/home" element= { <Home />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;