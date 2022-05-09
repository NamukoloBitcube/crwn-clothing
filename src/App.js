
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

import HomePage from './pages/homepage/homepage.component';
import Navigation from './pages/navigation/navigation.component';
import Authentication from './pages/authentication/authentication.component';
import Shop from './components/shop/shop.component';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={ <Navigation /> } >
          <Route index element={ <HomePage /> } />
          <Route  path='/hats' element={ <Shop /> } />
          <Route path='/auth' element ={ <Authentication />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;






































