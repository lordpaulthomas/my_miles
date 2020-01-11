import axios from 'axios';
export default {
  addStats: function(stats) {
    return axios.post('/stats', stats)
  },
  getStats: function () {
    return axios.get('/stats')
  },
  deleteStat: function (id) {
    return axios.delete('/stats/' + id)
  }
}