import React, {Component } from 'react'
import axios from 'axios'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

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
            const response = await axios.post(`/person/create/${this.state.userEmail}`, {
                name : this.state.userName,
                email : this.state.userEmail
            })
            const userId = response.data.person.id
            const userEmail = response.data.person.email
            this.props.setUser(true, userId, userEmail)
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
                    <div class="searchName">
                    <Button className="button" type='submit' variant="text" color="primary">Login/Signup</Button>
                   </div>
                   <TextField
                    id="tf-outlined"
                    class="mdc-text-field__input"
                    variant="outlined"
                    type='text'
                    name='userName' 
                    placeholder= 'Your Name'
                    value={this.state.userName}                 
                   />
                   <TextField
                    id="tf-outlined"
                    class="mdc-text-field__input"
                    variant="outlined"
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