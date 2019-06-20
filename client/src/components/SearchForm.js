import React, { Component } from 'react';
import axios from 'axios';

import {Link, Redirect} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';





class SearchForm extends Component {
  constructor(){
    super();
    this.state= {
      person:null,
      input:"",
      wishlistArray: [],
      redirect:false,
      searchAttempted: false
    }
  this.getData=this.getData.bind(this)
  this.updateInput=this.updateInput.bind(this)
  }

  //when this component finishes its first render
async getData(event){
    
    event.preventDefault()
    
    const response = await axios.get(`http://localhost:4567/wishlist/email/${this.state.input}`)
    console.log(response)
    response.data.personWishlistsAndItems ? 
    this.setState({
        name:response.data.personWishlistsAndItems.name,//saving the response 
        email:response.data.personWishlistsAndItems.email,
        wishlistArray:response.data.personWishlistsAndItems.wishlists,
        
    }) :
    this.setState({
        searchAttempted:true,
        name: '',
        email: '',
        wishlistArray:[]
    })



}

updateInput(event){
this.setState({//storing input to reuse it 
    input:event.target.value,
    redirect: true
    
    
})
}
  render() {
    const userInfo = this.state.email ?
        <div>
          <List>
            <ListItem>
            {/* </ListItem>label= "Name"  */}
            <ListItemText primary={this.state.name}/>
            </ListItem>
            <ListItem>
            <ListItemText primary={this.state.email && this.state.email}/>
            </ListItem>
            <div>
                {this.state.wishlistArray.map((wishlist)=>{
                  return <Link key={wishlist.id} to={`/wishlist/${wishlist.id}`}> <ListItem>
                  <ListItemText label="Wish List Name" primary={wishlist.title}/></ListItem> </Link>
                })}
              </div>
          </List>
        </div>
        :
        this.state.searchAttempted &&
         <Button color="primary" >Not a member</Button>

    return (

    <div className="search-wrapper">
       

     <Button color="primary" className="button"  onClick={this.getData}>Give a Gift</Button>
    
     <TextField name="email" type="text" placeholder="Search by email" onChange={this.updateInput}margin="normal"
        variant="outlined"/>
        
    

   
    {userInfo}
     
   
    </div>
      
    )
    
    
	}
}

export default SearchForm;
//on submit redirect to show list page // the 