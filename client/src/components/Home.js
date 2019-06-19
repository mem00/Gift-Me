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
        <Card className="card">
        <CardContent>
        {/* <CardContent> */}
        <Typography color="textSecondary" className="top-title" gutter bottom>Gift me</Typography>


          <div className="top-flex">
        
            {/* <h1 className="top-title">Gift me</h1> */}
            <Typography className="main-wrapper" id="create-wrapper">
            <CreateWishlist />
            </Typography>

 <Typography>           
            <Search />
            </Typography>
        </div>
        
        </CardContent>
        </Card>
    )
    
}
export default Home
