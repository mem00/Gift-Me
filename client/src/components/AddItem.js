import React, {Component} from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'


class AddItem extends Component {
    constructor(){
        super();
        this.state = {
            name: "",
            price: "",
            link: "",
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
        try{
        event.preventDefault();
        await axios.post(`/item/create/${this.props.location.state.wishlistId}`, {
            name: this.state.name,
            price: this.state.price,
            link: this.state.link
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
                fullWidth = "true"
                placeholder="Name"
                value={this.state.name}
                />
                <TextField
                name="price"
                type="number"
                fullWidth = "true"
                placeholder="Price"
                value={this.state.price}
                />
                <TextField
                name="link"
                type="text"
                fullWidth = "true"
                placeholder="Link"
                value={this.state.link}
                />
                 <Button variant="text" type="submit" color="primary">
                Add Item</Button>
                
            </form></div>
            )
        }
    }

    export default AddItem
