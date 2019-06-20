import React, {Component} from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

class AddEvent extends Component {
    constructor(){
        super();
        this.state = {
            name: "",
            date: "",
            redirect: false
        }
        this.handleChange=this.handleChange.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
        }
        handleChange(event){
            const name = event.target.name;
            const value = event.target.value;

            this.setState({
                [name]: value
            })
        }
        async handleSubmit(event){
            event.preventDefault();

            await axios.post(`/event/create/${this.props.location.state.wishlistId}`, {
                name: this.state.name,
                date:this.state.date,        
            })
            this.setState({
                redirect:true
            })
        }
        render(){
            return (
                <div>
                {this.state.redirect ?  <Redirect to={`/wishlist/${this.props.location.state.wishlistId}`}/>:null}
                <form
                onChange={this.handleChange}
                onSubmit={this.handleSubmit}
                >
                <TextField
                id="tf-outlined"
                class="mdc-text-field__input"
                variant= "outlined"
                name="name"
                type="text"
                fullWidth = "true"
                placeholder="Name of Event"               
                value={this.state.name}
                />
                    <TextField
                id="tf-outlined"
                class="mdc-text-field__input"
                variant= "outlined"
                name="date"
                type="date"
                fullWidth = "true"
                placeholder="Date"
                value={this.state.date}
                />
                <Button variant="text" type="submit" color="primary">
                Add Event</Button>
                </form></div>
            )
        }
    }

    export default AddEvent
//