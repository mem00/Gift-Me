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
            <TextField 
            label= "Name" value={this.state.name}/>
            <TextField
            label="Email" value={this.state.email && this.state.email}/>
            <div>
                {this.state.wishlistArray.map((wishlist)=>{
                  return <Link key={wishlist.id} to={`/wishlist/${wishlist.id}`}> <TextField 
                  label="Wish List Name" value={wishlist.title}/> </Link>
                })}
              </div>
        </div>
        :
        this.state.searchAttempted &&
         <Button color="primary" >Not a member</Button>

    return (
    <form onSubmit={this.getData} >
      <div className="search-wrapper">
      <Button type="submit" color="primary" className="button" >Give a Gift</Button>
    
      <TextField name="email" type="text" placeholder="Search by email" onChange={this.updateInput}margin="normal"
        variant="outlined"/> 
      {userInfo}  
      </div>
    </form>
      
    )
    
	}
}

export default SearchForm;
//on submit redirect to show list page // the 