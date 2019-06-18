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

    async handleSumbitForm(evt) {
        try{
            evt.preventDefault()
            const response = await axios.post(`person/create/${this.state.userEmail}`, {
                name : this.state.userEmail,
                email : this.state.userName
            })
            const userId = response.data.person.id
            this.props.setUser(true, userId)
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
                   <input
                    type='submit'
                    name='submit' 
                    placeholder= 'Submit'               
                   />
                </form>

            </div>
        )
    }
}

export default FindOrCreateUser