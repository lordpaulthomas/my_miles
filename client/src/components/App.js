import React, { Component } from 'react';
import moment from 'moment';
import API from './../utils/API';
import { ModalFooter, Modal, ModalHeader, ModalBody, Button } from 'reactstrap';
import Records from './Records';
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
    var d = moment().format('MMMM Do YYYY, h:mm:ss a');
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
    // this.setState({
    //   totalMiles: parseFloat(parseFloat(this.state.totalMiles) + parseFloat(this.state.miles)),
    //   totalCalories: parseFloat(parseFloat(this.state.totalCalories) + parseFloat(this.state.calories)),
    //   totalTime: parseFloat(parseFloat(this.state.totalTime) + parseFloat(this.state.time))
    // })
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
        <div className='container' style={{ width: '100vw' }}>
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
          <div className="row">
            <table className="table table-hover table-bordered table-dark table-active">
              <thead>
                <tr>
                  <th id="table-head" scope="col">Date</th>
                  <th id="table-head" scope="col">Miles</th>
                  <th id="table-head" scope="col">Calories</th>
                  <th id="table-head" scope="col">Minutes</th>
                  <th id="table-head" scope="col">Remove</th>
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
