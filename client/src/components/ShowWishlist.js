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
      wishlistId: null,
      personName: "", 
      redirect: false
    };
    this.handleDelete = this.handleDelete.bind(this)
  }

	async componentDidMount() {
    try{
      const itemResponse = await axios.get(`/item/wishlist/${this.props.match.params.id}`)
      const eventResponse = await axios.get(`/event/wishlist/${this.props.match.params.id}`)
      const wishlistResponse = await axios.get(`/wishlist/id/${this.props.match.params.id}`)
      const items = itemResponse.data.items
      const events = eventResponse.data.events
      const wishlistTitle = wishlistResponse.data.wishlist.title
      const wishlistId = wishlistResponse.data.wishlist.id
      const personId = wishlistResponse.data.wishlist.personId
      const personResponse = await axios.get(`/person/${personId}`)
      const personName = personResponse.data.person.name
      this.setState({
        items, 
        events,
        wishlistTitle,
        wishlistId,
        personName
      })
    }
    catch(err){
      console.log(err.message)
    }	
  }

  async handleDelete(path, id) {
     await axios.delete(`/${path}/delete/${id}`)
     this.forceUpdate()
     const response = await axios.get(`/${path}/wishlist/${this.props.match.params.id}`)
     const paths =  path+'s'
     const updatedArray = response.data[paths]
     this.setState({
       [paths] : updatedArray
     })
  }
 
	render() {
    const events = this.state.events.map(event=>{
      return (
      <div key={event.id}>
        <h5>{event.name}<button onClick= {()=>this.handleDelete("event",event.id)} name="event">X</button></h5>
        <h5>{event.date}</h5>
      </div>)
    })
    const items = this.state.items.map(item=>{
      return (
      <div key={item.id}>
        <h4>{item.name}<button onClick= {()=>this.handleDelete("item", item.id)} name="item">X</button></h4>
        <h4>{item.price}</h4>
        <h4>{item.link}</h4>
      </div>)
    })
		return (
			<div>
        {this.state.redirect ? <Redirect to={`/wishlist/${this.state.wishlistId}`}/>:null}
        <Link to="/"><button>Home</button></Link>
        <h1>{this.state.wishlistTitle}</h1>
        <h1>{this.state.personName}</h1>      
        {events}
        <Link to={{pathname: '/add-event', state: {wishlistId : this.state.wishlistId}}}><button>Add Event</button></Link>
        {items}   
        <Link to={{pathname: '/add-item', state: {wishlistId : this.state.wishlistId}}}><button>Add Item</button></Link>
			</div>
		);
	}
}

export default ShowWishlist;