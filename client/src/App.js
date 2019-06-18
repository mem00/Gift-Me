import React from 'react';
import { Switch, Route } from "react-router-dom";
import './App.css';
import CreateWishlist from './components/CreateWishlist';
import Search from './components/SearchForm';
import ShowWishlist from './components/ShowWishlist';

function App() {
 return (
   <div>
      <Switch>
         <Route exact path="/" component={CreateWishlist} />
         <Route exact path="/wishlist" component={ShowWishlist} />
       </Switch>

   </div>
 );
}

export default App;
