//have to add another route to get the event
import React, { Component } from 'react';
import axios from 'axios';
import {Redirect, Link} from 'react-router-dom';
import SearchForm from './SearchForm'

class ShowWishlist extends Component {
	constructor() {
		super();
		this.state = {
      personToShow:{},
      redirect:false
      
      
    };
    //this.handleDelete=this.handleDelete.bind(this)
  }
  
  //this.props.location.person


	async componentDidMount() {
		const response = await axios.get(`http://localhost:3000/${this.props.location.person.email}`);
		const person = response.data.person;
		this.setState({
			personToShow: person
		});
		
  }
  
//   async handleDelete(event){

//     event.preventDefault()
    
//     const response=await axios.delete(`/wishlist/${this.props.match.params.person.id}`)
    
//     this.setState({//update state for redirect
//       redirect: true
//     })
   
//  }
//  async handleUpdate(event){

//     event.preventDefault()
    
//     const response=await axios.delete(`/wishlist/${this.props.match.params.person.id}`)
    
//     this.setState({//update state for redirect
//       redirect: true
//     })
   
//  }


	render() {
    const personToShow =this.props.location.person;
    
    
		return (
			<div>
        <div>Hello</div>
        {this.state.redirect ?<Redirect to="/"/>:null}
      {/* we redirect after deleting to the home page */}
				<div>name: {personToShow.name}</div>
				<div>email: {personToShow.email}</div>
				{/* <div>wishlistTitle: {wishlistToShow.title}</div>
                <div>events:{wishlistToShow.event}</div> */}
                <SearchForm
        personId= {personToShow.id}
        />
        {/* <button onClick={this.handleUpdate}>Edit</button>
        <button onClick={this.handleDelete}>Delete</button>
        <br/>
        <br/> */}
			</div>
		);
	}
}

export default ShowWishlist;