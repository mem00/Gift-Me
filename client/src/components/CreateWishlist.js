import React, { Component } from 'react'
import CreateWishlistForm from './CreateWishlistForm'  
import FindOrCreateUser from './FindOrCreateUser'

class  CreateWishlist extends Component () {
    constructor(){
        super()
        this.state = ({
            user: false
        })
        this.setUser = this.setUser.bind(this)
    }

    setUser(isLoggedInOrCreated) {
        this.setState({
            user: isLoggedInOrCreated
        })
    }
    
    render() {
        return (
            <div>
                <h1>Create Wishlist</h1>
                {this.state.user ? <CreateWishlistForm/> : <FindOrCreateUser setUser = {this.setUser} />}
            </div>
        )
    }
}

export default CreateWishlist