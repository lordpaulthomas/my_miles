import React, { Component } from 'react';
import moment from 'moment';
import API from './../utils/API';
import { ModalFooter, Modal, ModalHeader, ModalBody, Button } from 'reactstrap';

class App extends Component {
  state = {
    totalMiles: 0,
    totalCalories: 0,
    totalTime: 0,
    miles: 0,
    calories: 0,
    time: 0,
    date: '',
    stats: [],
    modal: false
  }

  componentDidMount = () => {
    var d = moment().format('MMMM Do YYYY, h:mm:ss a');
    this.setState({
      date: this.state.date + d
    })

    API.getStats()
      .then(res => {
        console.log(res.data.length)
        if (res.data.length > 0) {
          this.setState({
            stats: res.data,
            totalMiles: res.data[res.data.length - 1].miles,
            totalCalories: res.data[res.data.length - 1].calories,
            totalTime: res.data[res.data.length - 1].time
          })
        }
      })
      .catch(err => console.log(err))
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  }

  handleMilesInputChange = event => {
    const { value } = event.target;
    this.setState({
      miles: value
    })
  }

  handleCaloriesInputChange = event => {
    const { value } = event.target;
    this.setState({
      calories: value
    })
  }

  handleTimeInputChange = event => {
    const { value } = event.target;
    this.setState({
      time: value
    })
  }
  handleSubmit = event => {
    event.preventDefault()
    this.toggle()
  }

  addStats = () => {
    console.log(this.state.stats.length)
    this.setState({
      totalMiles: parseFloat(parseFloat(this.state.totalMiles) + parseFloat(this.state.miles)).toLocaleString(),
      totalCalories: parseFloat(parseFloat(this.state.totalCalories) + parseFloat(this.state.calories)).toLocaleString(),
      totalTime: parseFloat(parseFloat(this.state.totalTime) + parseFloat(this.state.time)).toLocaleString()
    })
    const stats = {
      miles: this.state.totalMiles,
      calories: this.state.totalCalories,
      time: this.state.totalTime
    }
    API.addStats(stats)
    this.toggle()
    document.getElementById('miles').value = '';
    document.getElementById('calories').value = '';
    document.getElementById('time').value = '';
  }


  render() {

    return (
      <div className='container m-5 p-5 border' style={{ width: '100vw' }}>
        <div className="row">
          <div style={{ margin: 'auto' }}>
            <h4 id='date' className="pl-5 pr-5">{this.state.date}</h4>
          </div>
        </div>
        <div className='row'>
          <form id='form' className="col-lg-6 " style={{ margin: 'auto' }}>
            <div >
              <div className="form-group" >
                <label>Miles:</label>
                <input onChange={this.handleMilesInputChange} type='number' className="form-control" id='miles' />
                <label>Calories:</label>
                <input onChange={this.handleCaloriesInputChange} type='number' className="form-control" id='calories' />
                <label>Time (min):</label>
                <input onChange={this.handleTimeInputChange} type='number' className="form-control" id='time' />
                <button id='button' onClick={this.handleSubmit} style={{ width: '10vw' }} className='btn mt-2 mb-2 float-right'>Enter</button>

              </div>
            </div>
          </form>
          <div id='stats' className="col-lg-6 pt-2">
            <div>
              <div>
                <h1 id="stat-title">Your Stats</h1>
              </div>
              <h2>Miles: {this.state.totalMiles}</h2>
              <h2>Calories: {this.state.totalCalories}</h2>
              <h2>Time: {this.state.totalTime} min</h2>
            </div>
          </div>
        </div>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}></ModalHeader>
          <ModalBody id="modal-body">
            <h2 id="modal">Miles: {this.state.miles}</h2>
            <h2 id="modal">Calories: {this.state.calories}</h2>
            <h2 id="modal">Time: {this.state.time}</h2>
            <div className="text-center">
              <Button id='modal-button' className='m-2' onClick={this.toggle}>go back</Button>
              <Button id='modal-button' className='m-2' onClick={this.addStats}>confirm</Button>
            </div>
          </ModalBody>
          <ModalFooter />
        </Modal>
      </div>
    )
  }
}


export default App;
