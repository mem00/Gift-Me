import React, {Component } from 'react'
import axios from 'axios'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

class CreateWishlistForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            wishlistTitle: ""
        }
        this.handleSumbitForm = this.handleSumbitForm.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    async handleSumbitForm(evt) {
        try{
            evt.preventDefault()
            const response = await axios.post(`/wishlist/create/${this.props.userId}`,{
                title : this.state.wishlistTitle
            })
            const wishlistId = response.data.wishlist.id
            this.props.setWishlist(true, wishlistId);
        }
        catch(err) {
            console.log(err.message)
        }
    }

    handleInputChange(evt){
        const name = evt.target.name;
        const value = evt.target.value;
        this.setState({
            [name] : value
        })
    }
    render() {
        return(
            <div className="wishlist-wrapper">
                <form onChange={this.handleInputChange} onSubmit={this.handleSumbitForm}>
                <h1><Button type='submit' variant="text" color="primary">Create Wishlist</Button></h1>
            <List>
                <ListItem>
                    <ListItemText 
                    variant="outlined"
                    name='wishlistTitle' 
                    placeholder= 'Wishlist Title'
                    primary={this.state.wishlistTitle}                 
                   />
                   </ListItem>
                </List>

                </form>
            </div>
        )
    }
}

export default CreateWishlistForm