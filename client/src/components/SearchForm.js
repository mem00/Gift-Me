import React, { Component } from 'react';
import axios from 'axios';
import {Link, Redirect} from 'react-router-dom';

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
            <div>{this.state.name}</div>
            <div>{this.state.email && this.state.email}</div>
            <div>
                {this.state.wishlistArray.map((wishlist)=>{
                  return <Link key={wishlist.id} to={`/wishlist/${wishlist.id}`}> <div> {wishlist.title}</div> </Link>
                })}
              </div>
        </div>
        :
        this.state.searchAttempted && <div>nobody home</div>

    return (
    <div>
        
     <input name="email" type="text" placeholder="Enter email" onChange={this.updateInput}></input>
     <button onClick={this.getData}>Submit</button>
    {userInfo}
     
    
    </div>
      
    )
    
	}
}

export default SearchForm;
//on submit redirect to show list page // the 