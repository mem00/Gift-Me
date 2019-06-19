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
        {/* <CardContent> */}
          <div>
            <h1 className="top-title">Gift me</h1>
            <div className="main-wrapper">

            <div id="create-wrapper" className="matching-front">
            <CreateWishlist />
            </div>
            
            <Search />
            </div>
        </div>
        </Card>
    )
    
}


export default Home