import React from 'react';
import { Switch, Route } from "react-router-dom";
import './App.css';
import Home from './components/Home'
import ListWishlists from './components/ListWishlists';
import ShowWishlist from './components/ShowWishlist';
import SearchForm from './components/SearchForm'

function App() {
 return (
   <div>
      <Switch>
         <Route exact path="/" component={Home} />
         <Route exact path="/list-wishlists" component={ListWishlists} />
         <Route exact path="/wishlist/:id" component={ShowWishlist} />
         <Route exact path="/" component={SearchForm} />
       </Switch>

   </div>
 );

}

export default App;
