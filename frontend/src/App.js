import React, { Component } from 'react';
import { Route, Routes, Switch } from 'react-router-dom';
import './App.css';
import Home from './components/Home';

function App() {
  return (
    <Routes>
    <Route exact path='/' element={<Home />}/>
    </Routes>
  );
}

export default App;
