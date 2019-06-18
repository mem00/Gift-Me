import React from 'react';
import { Switch, Route } from "react-router-dom";
import './App.css';
import axios from 'axios';
import AddEvent from './components/AddEvent';
import AddItem from './components/AddItem';
import CreateWishlist from './components/CreateWishlist';
import CreateWishlistForm from './components/CreateWishlistForm';
import Search from './components/SearchForm';
import SearchForm from './components/SearchForm';
import ShowWishlist from './components/ShowStudent';

function App() {
  return (
    <div className="App">
       <Switch>
          <Route exact path="/wishlist/:id/event/create" component={AddEvent} />
          <Route exact path="/wishlist/:id/item/create" component={AddItem} />
          <Route exact path="/" component={CreateWishlist} />
          <Route exact path="//:id/edit" component={CreateWishlistForm} />
          <Route exact path="/???" component={Search} />
          <Route exact path="/???" component={SearchForm} />
          <Route exact path="/wishlist" component={ShowWishlist} />
        </Switch>
  
    </div>
  );
}

export default App;
