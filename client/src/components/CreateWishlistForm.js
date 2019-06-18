import React, {Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

class CreateWishlistForm extends Component {
    constructor() {
        super()
        this.state = {
            userName: "",
            userEmail: "",
            wishlistTitle: ""
        }
        this.handleSumbitForm = this.handleSumbitForm.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    async handleSumbitForm(e) {
        e.preventDefault()
    }

    handleInputChange(e){

    }

    render() {
        return(
            <div>

                
            </div>
        )
    }


}