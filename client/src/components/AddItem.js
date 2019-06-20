import React, {Component} from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Modal from 'react-modal'


class AddItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: "",
            price: "",
            link: "",
            redirect: false,
            showModal: false
        }
        this.handleChange=this.handleChange.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
        this.handleCloseModal=this.handleCloseModal.bind(this)
        this.handleOpenModal=this.handleOpenModal.bind(this)
        }
    handleChange(event){
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value
        })
    }
    async handleSubmit(event){
        try{
        event.preventDefault();
        await axios.post(`/item/create/${this.props.wishlistId}`, {
            name: this.state.name,
            price: this.state.price,
            link: this.state.link
        })
        const response = await axios.get(`/item/wishlist/${this.props.wishlistId}`)
        this.props.setItems(response.data.items)
        this.setState({
            redirect:true,
            showModal:false
        })
       
        }
        catch(err) {
            console.log(err.message)
        }
    }


    handleOpenModal(){
        let showModal = true;
        this.setState({showModal});
    }

    handleCloseModal(){
        this.setState({showModal : false});
    }

    render(){
        return (
            <div>
            <Button variant = "contained" onClick={this.handleOpenModal}>Add Item</Button>
            <Modal
            ariaHideApp={false}
            isOpen={this.state.showModal}
            contentLabel="onRequestClose "
            onRequestClose={this.handleCloseModal}>
            <div>
            {/* {this.state.redirect ? <Redirect to={`/wishlist/${this.props.location.state.wishlistId}`}/>:null} */}
            <form
            onChange={this.handleChange}
            onSubmit={this.handleSubmit}
            >
                <TextField
                id="tf-outlined"
                class="mdc-text-field__input"
                variant= "outlined"
                name="name"
                type="text"
                placeholder="Name"
                value={this.state.name}
                />
                <TextField
                id="tf-outlined"
                class="mdc-text-field__input"
                variant= "outlined"
                name="price"
                type="number"
                placeholder="Price"
                value={this.state.price}
                />
                <TextField
                id="tf-outlined"
                class="mdc-text-field__input"
                variant= "outlined"
                name="link"
                type="text"
                placeholder="Link"
                value={this.state.link}
                />
                 <Button variant="text" type="submit" color="primary">
                Add Item</Button>
                
            </form></div>
            </Modal>
            </div>
            )
        }
    }

    export default AddItem
