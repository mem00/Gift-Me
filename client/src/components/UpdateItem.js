import React, {Component} from 'react';
import axios from "axios";
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import MaterialIcon from 'material-icons-react';
import Modal from 'react-modal'

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class UpdateItem extends Component  {
  constructor(){
    super();
    this.state = {
      name: "",
      price: "",
      link: "",
      showModal: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCloseModal=this.handleCloseModal.bind(this)
    this.handleOpenModal=this.handleOpenModal.bind(this)
  }

  async componentDidMount(){
    try{
      const response = await axios.get(`/item/${this.props.itemId}`)
      const item = response.data.item;
      this.setState({
        name: item.name,
        price: item.price,
        link: item.link 
      })
    }
    catch(err){
      console.log(err.message)
    }
  }

  handleChange(event){
    event.preventDefault()
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    })    
  }

  async handleSubmit(event){
    try{
      event.preventDefault();
      await axios.put(`/item/update/${this.props.itemId}`, {
          name: this.state.name,
          price: this.state.price,
          link: this.state.link
      })
      const response = await axios.get(`/item/wishlist/${this.props.wishlistId}`)
      this.props.setItems(response.data.items)
      this.setState({
          showModal:false
      })
    }
    catch(err) {
        console.log(err.message)
    }
  }

  handleOpenModal(){
    this.setState({
      showModal : true
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
        <MaterialIcon icon="edit" color = "blue" onClick={this.handleOpenModal} />
        <Modal
              ariaHideApp={false}
              isOpen={this.state.showModal}
              contentLabel="onRequestClose "
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
                placeholder="Name"
                value={this.state.name}/>
              <TextField
                required="required"
                id="tf-outlined"
                class="mdc-text-field__input"
                variant= "outlined"
                name="price"
                type="number"   
                placeholder="Price"
                value={this.state.price}/>
              <TextField
                required="required"
                id="tf-outlined"
                class="mdc-text-field__input"
                variant= "outlined"
                name="link"
                type="text"  
                placeholder="Link"
                value={this.state.link}
                src = {this.state.link}/>
              <Button variant="text" type="submit" color="primary">Update Item</Button>
            </form>
          </div>
        </Modal>
      </div>
    )
  }
}

export default UpdateItem
