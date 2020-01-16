import React, { Component } from 'react';
import moment from 'moment';
import API from './../utils/API';
import { ModalFooter, Modal, ModalHeader, ModalBody, Button } from 'reactstrap';
import Records from './Records';
import './../style.css'
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
    this.setState({
      date: ''
    })
    var d = moment().format(`MMMM Do YYYY H:mm`);
    this.setState({
      date: d
    })

    API.getStats()
      .then(res => {
        this.setState({
          stats: res.data
        })
        let total_miles = 0;
        let total_calories = 0;
        let total_time = 0;
        for (let i = 0; i < res.data.length; i++) {
          total_miles += res.data[i].miles;
          total_calories += res.data[i].calories;
          total_time += res.data[i].time

        }
        this.setState({
          totalMiles: parseFloat(total_miles),
          totalCalories: parseFloat(total_calories),
          totalTime: parseFloat(total_time)
        })
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
    const stats = {
      miles: this.state.miles,
      calories: this.state.calories,
      time: this.state.time,
      date: this.state.date
    }
    API.addStats(stats)
    this.toggle()
    this.componentDidMount()
    document.getElementById('miles').value = '';
    document.getElementById('calories').value = '';
    document.getElementById('time').value = '';
  }


  render() {

    return (
      <div id="background">

        <div >
          <div className="row">
            <div style={{ margin: 'auto' }} className="col-sm-12">
              <h4 id='date' className="col-12 text-center">{this.state.date}</h4>
            </div>
          </div>
          <div className='row'>
            <form id='form' className="col-lg-6 col-sm-6" style={{ margin: 'auto' }}>
              <div className="">
                <div className="form-group text-center" >
                  <label for="miles">Miles:</label>
                  <input onChange={this.handleMilesInputChange} name="miles" type='number' className="form-control" id='miles' required />
                  <label>Calories:</label>
                  <input onChange={this.handleCaloriesInputChange} type='number' className="form-control" id='calories' required />
                  <label>Time (min):</label>
                  <input onChange={this.handleTimeInputChange} type='number' className="form-control" id='time' required />
                  <div className="text-center">
                    <button type="submit" id='button' onClick={this.handleSubmit} style={{ width: '20vw' }} className='btn mt-2 mb-2'>Enter</button>
                  </div>
                </div>
              </div>
            </form>
            <div id='stats' className="col-lg-6 pt-2">
              <div>
                <div className='text-center'>
                  <h1 id="stat-title">Your Stats</h1>
                </div>
                <div className="text-center">
                  <h2>Miles: <span id="stat">{this.state.totalMiles.toLocaleString()}</span></h2>
                  <h2>Calories: <span id="stat">{this.state.totalCalories.toLocaleString()}</span></h2>
                  <h2>Time: <span id="stat">{this.state.totalTime.toLocaleString()} min </span></h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div id="outline" className="col-lg-12">
            <table id="table">
              <thead className='col-sm-12'>
                <tr >
                  <th id="table-head" style={{width: '20vw'}} scope="col">Date</th>
                  <th id="table-head" style={{width: '16vw'}}  scope="col">Miles</th>
                  <th id="table-head" style={{width: '16vw'}}   scope="col">Cal</th>
                  <th id="table-head" style={{width: '16vw'}}   scope="col">Min</th>
                  <th id="table-head" style={{width: '16vw'}}   scope="col">Cal/Min</th>
                  <th id="table-head" style={{width: '16vw'}}   scope="col">Remove</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.stats.map(stat => {
                    return (
                      <Records
                        componentDidMount={this.componentDidMount}
                        key={stat._id}
                        date={stat.date}
                        miles={stat.miles}
                        calories={stat.calories}
                        calMin={(parseFloat(stat.calories) / parseFloat(stat.time)).toFixed(2)}
                        time={stat.time}
                        _id={stat._id}
                      />
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}></ModalHeader>
          <ModalBody id="modal-body" >
            <h2 className="text-center" id="modal">Miles: {this.state.miles}</h2>
            <h2 id="modal">Calories: {this.state.calories}</h2>
            <h2 id="modal">Time: {this.state.time}</h2>
            <div className="text-center">
              <Button id='modal-button' className='m-2' onClick={this.toggle}>Go Back</Button>
              <Button id='modal-button' className='m-2' onClick={this.addStats}>Confirm</Button>
            </div>
          </ModalBody>
          <ModalFooter />
        </Modal>
      </div>

    )
  }
}


export default App;
