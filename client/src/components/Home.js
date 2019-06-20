import React from 'react'
import CreateWishlist from './CreateWishlist';
import Search from './Search';

import Card from '@material-ui/core/Card';

import CardContent from '@material-ui/core/CardContent';

import Typography from '@material-ui/core/Typography';
import logo from '../images/giphy.gif'

function Home() {

      return(
        <div>
          <Typography color="textSecondary" className="top-title" gutter bottom>Gift me</Typography>
            <div className="top-flex">
           
              <Card>
                <CardContent>
                  <Typography >
                    <CreateWishlist />
                  </Typography>
                </CardContent>
              </Card>
              <img src={logo} height="10%" width="10%"></img>
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
