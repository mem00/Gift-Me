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
                {this.state.wishlist ? <Redirect to = {`/wishlist/${this.state.wishlistId}`} />: null}
                {this.state.user ? <CreateWishlistForm setWishlist = {this.setWishlist} userId = {this.state.userId}/> : <FindOrCreateUser setUser = {this.setUser} />}
            </div>
        )
    }
}

export default CreateWishlist