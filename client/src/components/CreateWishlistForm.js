import React, {Component } from 'react'
import axios from 'axios'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'


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
            <div>
                <form onChange={this.handleInputChange} onSubmit={this.handleSumbitForm}>
                <h1><Button type='submit' variant="text" color="primary">Create Wishlist</Button></h1>
                   <TextField
                    variant="outlined"
                    name='wishlistTitle' 
                    placeholder= 'Wishlist Title'
                    value={this.state.wishlistTitle}                 
                   />

                </form>
            </div>
        )
    }
}

export default CreateWishlistForm