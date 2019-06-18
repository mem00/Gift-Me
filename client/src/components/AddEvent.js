import React, {Component} from 'react'
import axios from 'axios'
import {Redirect} from "react-router-dom"

class CreateEvent extends Component {
    constructor(){
        super();
            this.state = {
                name: "",
                date: "",
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
                event.preventDefault();

                await axios.post("http://localhost:4567/event", {
                    name: this.state.name,
                    date:this.state.date,
                  
                })
                this.setState({
                    redirect:true
                })
            }
            render(){
                return (
                    <div>
                    {this.state.redirect ? <Redirect to="/wishlist"/>:null}
                    <form
                    onChange={this.handleChange}
                    onSubmit={this.handleSubmit}
                    >
                        <input
                        name="name"
                        type="text"
                        placeholder="NAME OF EVENT"
                        value={this.state.name}
                        />
                         <input
                        name="date"
                        type="date"
                        placeholder="DATE"
                        value={this.state.date}
                        />
                        <input type="submit"
                        />
                        </form></div>
                )
            }
    }

    export default CreateEvent
//