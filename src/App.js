
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

import HomePage from './pages/homepage/homepage.component';
import Navigation from './pages/navigation/navigation.component';


const HatsPage = () => (
  <div>
    <h1>HATS PAGE</h1>
  </div>
);



function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={ <Navigation /> } >
          <Route index element={ <HomePage /> } />
          <Route  path='/hats' element={ <HatsPage /> } />
        </Route>
      </Routes>
    </div>
  );
}

export default App;






































