import React, {Component} from 'react'
import axios from 'axios'
import {Redirect} from "react-router-dom"

class AddItem extends Component {
    constructor(){
        super();
            this.state = {
                name: "",
                price: "",
                link: "",
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

                await axios.post("http://localhost:4567/create/:wishlist_id", {
                    name: this.state.name,
                    price:this.state.price,
                    link:this.state.link
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
                        placeholder="NAME"
                        value={this.state.name}
                        />
                         <input
                        name="price"
                        type="number"
                        placeholder="PRICE"
                        value={this.state.price}
                        />
                         <input
                        name="link"
                        type="text"
                        placeholder="LINK"
                        value={this.state.link}
                        />
                        <input type="submit"
                        />
                        </form></div>
                )
            }
    }

    export default AddItem
