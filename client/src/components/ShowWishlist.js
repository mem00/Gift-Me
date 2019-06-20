//have to add another route to get the event
import React, { Component } from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import MaterialIcon, {colorPalette} from 'material-icons-react';
import Link from '@material-ui/core/Link';
import { spacing } from '@material-ui/system';

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
        <h5>{event.name}{"      "}
      {event.date}</h5>
      <MaterialIcon onClick= {()=>this.handleDelete("event",event.id)} icon = "delete" name="event"></MaterialIcon>
        <Link to={{pathname: '/update-event', state: {eventId: event.id, wishlistId : this.state.wishlistId}}}><MaterialIcon icon="edit" /></Link>
      </div>)
    })
    const items = this.state.items.map(item=>{
      return (
      <div key={item.id}>
        
       

        <h4>
        <div>{item.name}{"      "}{"$"}{item.price}{"      "}
        <Link target="_blank" rel="noreferrer" rel="noopener" href={item.link}>
        Link
      </Link>
        </div></h4><MaterialIcon onClick= {()=>this.handleDelete("item", item.id)} icon= "delete" name="item"> </MaterialIcon>
        <Link to={{pathname: '/update-item', state: {itemId: item.id, wishlistId : this.state.wishlistId}}}><MaterialIcon icon="edit" /> </Link>
      </div>)
    })
		return (
			<div className="wishlist-wrapper">
        {this.state.redirect ? <Redirect to={`/wishlist/${this.state.wishlistId}`}/>:null}

        <Link to="/"><MaterialIcon icon="home" color ="purple" /> </Link>
        <TextField label= "Name" value={this.state.personName}/>      
        <TextField label="Wish List" value={this.state.wishlistTitle}/>       
        {events}
        <Link to={{pathname: '/add-event', state: {wishlistId : this.state.wishlistId}}}><Button color="primary">Add Event</Button></Link>
        {items}   
        <Link to={{pathname: '/add-item', state: {wishlistId : this.state.wishlistId}}}><Button color="primary">Add Item</Button></Link>
			</div>
		);
	}
}

export default ShowWishlist;