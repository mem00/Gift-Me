import React from 'react'
import CreateWishlist from './CreateWishlist';
import Search from './Search';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';



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
