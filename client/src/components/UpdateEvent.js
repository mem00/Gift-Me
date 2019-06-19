import React, {Component} from 'react';
import axios from "axios";
import {Redirect} from "react-router-dom"
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

class  UpdateEvent extends Component  {
  constructor(){
    super();
    this.state = {
      name: "",
      date: "",
      redirect: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async componentDidMount(){
    const response = await axios.get(`/event/${this.props.location.state.eventId}`)
    const event = response.data.event;
    this.setState({
      name: event.name,
      date: event.date
     
    })
  }

  handleChange(event){
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    })    
  }

  async handleSubmit(event){
    try{
    event.preventDefault();
    await axios.put(`/event/update/${this.props.location.state.eventId}`, {
        name: this.state.name,
        date: this.state.date
    })
    this.setState({
        redirect:true
    })
    }
    catch(err) {
        console.log(err.message)
    }
}
render(){
    return (
        <div>
        {this.state.redirect ? <Redirect to={`/wishlist/${this.props.location.state.wishlistId}`}/>:null}
        <form
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
        >
            <TextField
            name="name"
            type="text"
            id="tf-outlined" 
            class="mdc-text-field__input"
            placeholder="Name"
            value={this.state.name}
            />
            <TextField
            name="date"
            type="text"
            id="tf-outlined" 
            class="mdc-text-field__input"
            placeholder="Date"
            value={this.state.date}
            />
            <Button variant="text" type="submit" color="primary">
                Update Event</Button>
        </form></div>
        )
    }
}

export default UpdateEvent
