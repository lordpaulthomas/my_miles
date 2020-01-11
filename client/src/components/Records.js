import React, { Component } from 'react';
import API from './../utils/API';

class Records extends Component {

  deleteStat = (id) => {
    console.log(id)
    API.deleteStat(id)
      .then(res => this.props.componentDidMount())
      .catch(err => console.log(err))
  }

  render() {
    return (
      <tr>
        <td id="tabe-data">{this.props.date}</td>
        <td id="tabe-data">{this.props.miles}</td>
        <td id="tabe-data">{this.props.calories}</td>
        <td id="tabe-data">{this.props.time}</td>
        <td id="tabe-data">
          <button onClick={() => this.deleteStat(this.props._id)}
            className='btn btn-outline-dark text-light'>X</button>
        </td>
      </tr>
    )
  }
}

export default Records;