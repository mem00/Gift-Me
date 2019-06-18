import React from 'react';
import { Switch, Route } from "react-router-dom";
import './App.css';
import Home from './components/Home'
import ShowWishlist from './components/ShowWishlist';

function App() {
 return (
   <div>
      <Switch>
         <Route exact path="/" component={Home} />
         <Route exact path="/wishlist" component={ShowWishlist} />
        
       </Switch>

   </div>
 );

}

export default App;
