//have to add another route to get the event
import React, { Component } from 'react';
import axios from 'axios';
import {Redirect, Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

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
        <TextField value={event.name}/><Button onClick= {()=>this.handleDelete("event",event.id)} name="event">X</Button>
        <TextField value={event.date}/>
      </div>)
    })
    const items = this.state.items.map(item=>{
      return (
      <div key={item.id}>
        <TextField label="Item" value={item.name}/><Button onClick= {()=>this.handleDelete("item", item.id)} name="item">X</Button>
        <TextField label="Price" value={item.price}/>
        {/* <TextField label="Link" value={item.link}/> */}
        <Button href="#text-buttons" value={item.link}>
        Link
      </Button>
      </div>)
    })
		return (
			<div className="wishlist-wrapper">
        {this.state.redirect ? <Redirect to={`/wishlist/${this.state.wishlistId}`}/>:null}
        <Link to="/"><Button  color="primary">Home</Button></Link>
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