import React, {Component} from 'react'
import axios from 'axios'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Modal from 'react-modal'

const customStyles = {
    content : {
      top                   : '25%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
};

class AddEvent extends Component {
    constructor(){
        super();
        this.state = {
            name: "",
            date: "",
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
            await axios.post(`/event/create/${this.props.wishlistId}`, {
                name: this.state.name,
                date:this.state.date,        
            })
            const response = await axios.get(`/event/wishlist/${this.props.wishlistId}`)
            this.props.setEvents(response.data.events)
            this.setState({
                showModal:false
            })
        }
        catch(err){
            console.log(err.message)
        }
    }

    handleOpenModal(){
        this.setState({
            showModal:true
        });
    }
    
    handleCloseModal(){
        this.setState({
            showModal : false
        });
    }

    render(){
        return (
            <div>
                <Button variant = "contained" color="primary" onClick={this.handleOpenModal}>Add Event</Button>
                <Modal
                    ariaHideApp={false}
                    isOpen={this.state.showModal}
                    contentLabel="onRequestClose"
                    onRequestClose={this.handleCloseModal}
                    style = {customStyles}>
                    <div>
                        <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
                            <TextField
                                required="required"
                                id="tf-outlined"
                                class="mdc-text-field__input"
                                variant= "outlined"
                                name="name"
                                type="text"      
                                placeholder="Name of Event"               
                                value={this.state.name}/>
                            <TextField
                                required="required"
                                id="tf-outlined"
                                class="mdc-text-field__input"
                                variant= "outlined"
                                name="date"
                                type="date"
                                placeholder="Date"
                                value={this.state.date}/>
                                <Button variant="text" type="submit" color="primary">Add Event</Button>
                        </form>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default AddEvent
