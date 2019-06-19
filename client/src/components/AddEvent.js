import React, {Component} from 'react'
import axios from 'axios'
import {Redirect} from "react-router-dom"
import Button from '@material-ui/core/Button'

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
                <input
                name="name"
                type="text"
                placeholder="NAME OF EVENT"
                value={this.state.name}
                />
                    <input
                name="date"
                type="date"
                placeholder="DATE"
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