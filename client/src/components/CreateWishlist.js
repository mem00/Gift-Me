import React, { Component } from 'react'
import CreateWishlistForm from './CreateWishlistForm'  
import FindOrCreateUser from './FindOrCreateUser'
import { Redirect } from 'react-router-dom'

class CreateWishlist extends Component {
    constructor(props){
        super(props)
        this.state = ({
            userEmail: "",
            user: false,
            wishlist: false,
            userId : null,
            wishlistId : null
        })
        this.setUser = this.setUser.bind(this)
        this.setWishlist = this.setWishlist.bind(this)
    }

    setUser(isLoggedInOrCreated, userId, userEmail) {
        this.setState({
            user: isLoggedInOrCreated,
            userId : userId,
            userEmail: userEmail
        })
    }

    setWishlist(isWishlistCreated, wishlistId) {
        this.setState({
            wishlist: isWishlistCreated,
            wishlistId: wishlistId
        })
    }
    
    render() {
        return (
            <div>
                {this.state.wishlist ? <Redirect to = {{pathname: `/wishlist/${this.state.wishlistId}`, state: {wishlistId : this.state.wishlistId, userEmail : this.state.userEmail}}} />: null}
                <h1>Create Wishlist</h1>
                {this.state.user ? <CreateWishlistForm setWishlist = {this.setWishlist} userId = {this.state.userId}/> : <FindOrCreateUser setUser = {this.setUser} />}
            </div>
        )
    }
}

export default CreateWishlist