import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
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
    try{
      event.preventDefault()
      const response = await axios.get(`/wishlist/email/${this.state.input}`)
      response.data.personWishlistsAndItems ? 
      this.setState({
          name:response.data.personWishlistsAndItems.name,    //saving the response 
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
    catch(err){
      console.log(err.message)
    }
  }

  updateInput(event){
    this.setState({            //storing input to reuse it 
        input: event.target.value,
        redirect: true
    })
  }

  render() {
    const userInfo = this.state.email ?
        <div>
          <List>
            <ListItem>
              <ListItemText primary={this.state.name}/>
            </ListItem>
            <div>
                {this.state.wishlistArray.map((wishlist)=>{
                  return <Link key={wishlist.id} to={`/wishlist/${wishlist.id}`}> <ListItem><ListItemText primary={wishlist.title}/></ListItem></Link>
                })}
              </div>
          </List>
        </div>
        :
        this.state.searchAttempted &&
        <ListItem>
          <ListItemText color="primary" primary="User Not Found"/>
        </ListItem>
    return (
      <form onSubmit={this.getData} >
        <div className="search-wrapper">
          <Button type="submit" color="primary" className="button" >Give a Gift</Button>
          <TextField required="required" name="email" type="text" placeholder="Search by email" onChange={this.updateInput}margin="normal" variant="outlined"/> 
          {userInfo}  
        </div>
      </form>    
    )  
	}
}

export default SearchForm;
 