//have to add another route to get the event
import React, { Component } from 'react';
import AddItem from './AddItem'
import axios from 'axios';
import {Redirect, Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import MaterialIcon from 'material-icons-react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


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
    this.setItems = this.setItems.bind(this)
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

  setItems(items){  
    this.setState({items})
  }
 
	render() {
    const events = this.state.events.map(event=>{
      return (
      <div key={event.id}>
        <h5>{event.name}{"      "}{event.date}</h5>
      <MaterialIcon onClick= {()=>this.handleDelete("event",event.id)} icon = "delete" name="event"></MaterialIcon>
        <Link to={{pathname: '/update-event', state: {eventId: event.id, wishlistId : this.state.wishlistId}}}><MaterialIcon icon="edit" /></Link> 
      </div>)
    })
    const items = this.state.items.map(item=>{
      return (
      <div key={item.id}>         
        <h4>
        <div>{item.name}{"      "}{"$"}{item.price}{"      "}
        <a target="_blank"  rel="noopener noreferrer" href={item.link}>Link</a>
        </div></h4><MaterialIcon onClick= {()=>this.handleDelete("item", item.id)} icon= "delete" name="item"> </MaterialIcon>
        <Link to={{pathname: '/update-item', state: {itemId: item.id, wishlistId : this.state.wishlistId}}}><MaterialIcon icon="edit" /> </Link>     
      </div>)
    })
		return (
			<div className="wishlist-wrapper">
        {this.state.redirect ? <Redirect to={`/wishlist/${this.state.wishlistId}`}/>:null}
        <Link to="/"><MaterialIcon  icon = "home"/></Link>
        <List>
            <ListItem>
            <ListItemText primary={this.state.personName}/>
            </ListItem>
            <ListItem>
            <ListItemText primary={this.state.wishlistTitle}/>
            </ListItem>
        </List>
        {events}
        <Link to={{pathname: '/add-event', state: {wishlistId : this.state.wishlistId}}}><Button color="primary">Add Event</Button></Link>
        {items}   
        <AddItem  wishlistId={this.state.wishlistId} setItems={this.setItems}/>
        {/* <Link to={{pathname: '/add-item', state: { modal: true, wishlistId : this.state.wishlistId}}}><Button color="primary">Add Item</Button></Link> */}
			</div>
		);
	}
}

export default ShowWishlist;