import React, {Component } from 'react'
import axios from 'axios'

class FindOrCreateUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userName: "",
            userEmail: "",
        }
        this.handleSumbitForm = this.handleSumbitForm.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    async handleSumbitForm(e) {
        e.preventDefault()

    }

    handleInputChange(e){
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name] : value
        })
    }




    render() {
        return(
            <div>
                <form onChange={this.handleInputChange} onSubmit={this.handleSumbitForm}>
                   <input
                    type='text'
                    name='userName' 
                    placeholder= 'Your Name'
                    value={this.state.userName}                 
                   />
                   <input
                    type='text'
                    name='userEmail' 
                    placeholder = 'Your Email'
                    value={this.state.userEmail}                 
                   />
                </form>

            </div>
        )
    }
}

export default FindOrCreateUser