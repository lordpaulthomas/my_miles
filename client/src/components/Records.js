import React, { Component } from 'react';
import API from './../utils/API';
import './../style.css'
import { ModalFooter, Modal, ModalHeader, ModalBody, Button } from 'reactstrap';

class Records extends Component {

  state = {
    modal_delete: false
  }

  deleteStat = (id) => {
    console.log(id)
    API.deleteStat(id)
      .then(res => this.props.componentDidMount())
      .catch(err => console.log(err))
  }
  toggle_delete = (id) => {
    this.setState({
      modal_delete: !this.state.modal_delete
    })
  }


  render() {
    return (
      <tr>
        <td id="tabe-data">{this.props.date}</td>
        <td id="tabe-data">{this.props.miles}</td>
        <td id="tabe-data">{this.props.calories}</td>
        <td id="tabe-data">{this.props.time}</td>
        <td id="tabe-data">
          <button onClick={() => this.toggle_delete(this.props._id)}
            className='btn btn-outline-light'>X</button>
        </td>
        <Modal isOpen={this.state.modal_delete} toggle={this.toggle_delete}>
          <ModalHeader toggle={this.toggle_delete}></ModalHeader>
          <ModalBody>
            <h1>Confirm Delete:</h1>
            <h5>{this.props.date}</h5>
            <h5>{this.props.miles} Miles</h5>
            <h5>{this.props.calories} Calories</h5>
            <h5>{this.props.time} Minutes</h5>
            <div className="text-center">
              <Button className='m-2' onClick={this.toggle_delete}>go back</Button>
              <Button className='m-2' onClick={() => this.deleteStat(this.props._id)}>confirm</Button>
            </div>
          </ModalBody>
          <ModalFooter />
        </Modal>
      </tr>
    )
  }
}

export default Records;