import React from 'react'
import CreateWishlist from './CreateWishlist';
import Search from './Search';

import Card from '@material-ui/core/Card';

import CardContent from '@material-ui/core/CardContent';

import Typography from '@material-ui/core/Typography';


import {makeStyles} from '@material-ui/styles'
import logo from '../images/giphy.gif'

const clear = makeStyles({
  root: {
      height: '220px' 
  }
})

function Home() {
  const classes = clear();
      return(
        <div>
          <h1 className="top-title" >Gift me</h1>
          <img className="img-center" alt= "gift" src={logo} height="10%" width="10%"></img>
            <div className="top-flex">
              <Card className={classes.root}>        
                <CardContent>
                  <Typography >
                    <CreateWishlist />
                  </Typography>
                </CardContent>
              </Card>
             
              <Card>    
                <CardContent>              
                  <Typography>          
                    <Search />
                  </Typography>
                </CardContent>
              </Card>
            </div> 
          </div>    
    )  
}
export default Home
