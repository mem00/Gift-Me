//have to add another route to get the event
import React, { Component } from 'react';
import axios from 'axios';
import {Redirect, Link} from 'react-router-dom';
import MaterialIcon, {colorPalette} from 'material-icons-react';


class ShowWishlist extends Component {
	constructor() {
		super();
		this.state = {
      items: [],
      events: [],
      wishlistTitle:"",
      wishlistId: null,
      personName: "", 
      date: "",
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
        personName,
      
       
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

  async handleChange(path, id) {
    await axios.put(`/${path}/update/${id}`)
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
        <h5>{event.name}<MaterialIcon onClick= {()=>this.handleDelete("event",event.id)} icon = "delete" name="event"></MaterialIcon></h5>
        <Link to={{pathname: '/update-event', state: {eventId: event.id, wishlistId : this.state.wishlistId}}}><MaterialIcon icon="edit" /></Link>
        <h5>{event.date}</h5>
      </div>)
    })
    const items = this.state.items.map(item=>{
      return (
      <div key={item.id}>
        <h4>{item.name}<MaterialIcon onClick= {()=>this.handleDelete("item", item.id)} icon= "delete" name="item"> </MaterialIcon>
        <Link to={{pathname: '/update-item', state: {itemId: item.id, wishlistId : this.state.wishlistId}}}><MaterialIcon icon="edit" /> </Link>
        </h4>
        <h4>{item.price}</h4>
        <h4>{item.link}</h4>
      </div>)
    })
  
		return (
			<div>
        {this.state.redirect ? <Redirect to={`/wishlist/${this.state.wishlistId}`}/>:null}
        <Link to="/"><MaterialIcon icon="home" color ="purple" /> 
</Link>
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