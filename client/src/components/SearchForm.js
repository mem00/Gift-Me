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
      redirect:false
    }
  this.getData=this.getData.bind(this)
  this.updateInput=this.updateInput.bind(this)
  }

  //when this component finishes its first render
async getData(event){
    event.preventDefault()
//console.log("mistake")
//make an axios request to the server and save the results as a variable
const response = await axios.get(`http://localhost:4567/wishlist/email/${this.state.input}`)
console.log(response)
this.setState({
    name:response.data.personWishlistsAndItems.name,//saving the response 
    email:response.data.personWishlistsAndItems.email,
    wishlistArray:response.data.personWishlistsAndItems.wishlists
    

})

//console.log(personArray);
  }

updateInput(event){
this.setState({//storing input to reuse it 
    input:event.target.value,
    redirect: true
    
})
}
  render() {
    return (<div>
    <div>
    {/* {this.state.person ?<Redirect to={
        {pathname:"/path", person:this.state.person}//object
        }// this.props.location.person --- to see the props on the other side 
     />:null} */}
     {/* https://stackoverflow.com/questions/52064303/reactjs-pass-props-with-redirect-component */}
     <input name="email" type="text" placeholder="Enter email" onChange={this.updateInput}></input>
     <button onClick={this.getData}>Submit</button>
    <div>{this.state.name}</div>
    <div>{this.state.email}</div>
    <div>
        {this.state.wishlistArray.map((wishlist)=>{
          return <Link key={wishlist.id} to={`/wishlist/${wishlist.id}`}> <div> {wishlist.title}</div> </Link>
        })}
      </div>
  </div>
    
    </div>
    
    )
	}
}

export default SearchForm;
//on submit redirect to show list page // the 