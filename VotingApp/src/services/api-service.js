import TokenService from '../services/token-service'
import config from '../config'

const ApiService = {
  getPolls() {
    return fetch(`${config.API_ENDPOINT}/polls`, {
      headers: {
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  getPoll(pollId) {
    return fetch(`${config.API_ENDPOINT}/polls/${pollId}`, {
      headers: {
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  addPoll({ name, description, options }) {
    return fetch(`${config.API_ENDPOINT}/polls`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({ name, description, options })
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  vote({ polloption_id }) {
    return fetch(`${config.API_ENDPOINT}/vote`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({ polloption_id })
    })
    .then(res =>
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    )
  },
  getVote(pollId) {
    console.log(`${config.API_ENDPOINT}/vote/${pollId}`);
    return fetch(`${config.API_ENDPOINT}/vote/${pollId}`, {
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
    })
    .then(res =>
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    )
  }
}

export default ApiService