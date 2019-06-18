//have to add another route to get the event
import React, { Component } from 'react';
import axios from 'axios';
import {Redirect, Link} from 'react-router-dom';


class ShowWishlist extends Component {
	constructor() {
		super();
		this.state = {
      items: [],
      events: [],
      wishlistTitle:"",
      personName: ""
    };
  }

	async componentDidMount() {
    try{
      const itemResponse = await axios.get(`/item/wishlist/${this.props.match.params.id}`)
      const eventResponse = await axios.get(`/event/wishlist/${this.props.match.params.id}`)
      const wishlistResponse = await axios.get(`/wishlist/id/${this.props.match.params.id}`)
      const items = itemResponse.data.items
      const events = eventResponse.data.events
      const wishlistTitle = wishlistResponse.data.wishlist.title
      const personId = wishlistResponse.data.wishlist.personId
      const personResponse = await axios.get(`/person/${personId}`)
      const personName = personResponse.data.person.name
      this.setState({
        items, 
        events,
        wishlistTitle,
        personName
      })
    }
    catch(err){
      console.log(err.message)
    }

  	
  }
  
	render() {
    const events = this.state.events.map(event=>{
      return (
      <div key={event.id}>
        <h5>{event.name}</h5>
        <h5>{event.price}</h5>
        <h5>{event.link}</h5>
      </div>)
    })
    const items = this.state.items.map(item=>{
      return (
      <div key={item.id}>
        <h4>{item.name}</h4>
        <h4>{item.price}</h4>
        <h4>{item.h5nk}</h4>
      </div>)
    })
		return (
			<div>
        <h1>{this.state.wishlistTitle}</h1>
        <h1>{this.state.personName}</h1>
        {events}
        {items}
			</div>
		);
	}
}

export default ShowWishlist;