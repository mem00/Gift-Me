import React from 'react'
import CreateWishlist from './CreateWishlist';
import Search from './Search';

import Card from '@material-ui/core/Card';

import CardContent from '@material-ui/core/CardContent';

import Typography from '@material-ui/core/Typography';

import {makeStyles} from '@material-ui/styles'

const clear = makeStyles({
  root: {

      height: '220px',
     
  }
})

function Home() {
  const classes = clear();
      return(
        <div>
          <h1 className="top-title" >Gift me</h1>
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
                          
                    <Search />
                 
                </CardContent>
              </Card>
            </div> 
          </div>    
    )  
}
export default Home
