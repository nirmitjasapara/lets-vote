import React, { Component } from 'react'
import ApiService from '../../services/api-service'
import CustomContext from '../../contexts/CustomContext';
import './Poll.css'

export default class Poll extends Component {
  static contextType = CustomContext
  static defaultProps = {
    onVoteSuccess: () => {}
  }

  state = { error: null , polloption_id: null}

  handleSubmit = ev => {
    ev.preventDefault()
    this.setState({ error: null })
    const { polloption_id } = this.state
    ApiService.vote({ polloption_id: polloption_id })
    .then(res => {
      this.props.onVoteSuccess(polloption_id)
    })
    .catch(res => {
      if (res.error==="Unauthorized request")
        this.setState({ error: "Please Log In" })
      else
        this.setState({ error: res.error })
    })
  }

  renderOptions(polloptions) {
    const { poll } = this.context
    return polloptions.map((x, i) =>
        <div
          className={'option'
           + ((x.id===this.state.polloption_id) ? ' selected' : '')
           + ((x.id===poll.currentVote) ? ' voted' : '')}
          onClick={e => this.handleInputChange(x.id)}
          key={'Poll__options' + i}
          id={'Poll__options' + i}
          disabled={poll.currentVote}>
          <h3>{x.name}</h3>
          <h4>{x.votes}</h4>
        </div>
    )
  }
  // handle input change
  handleInputChange(id) {
    this.setState({ polloption_id: id })
  }

  render() {
    const { error } = this.state
    const { poll } = this.context
    return (
      <section>
        <div role='alert'>
          {error && <p className='red'>{error}</p>}
        </div>
        <h1>{poll.name}</h1>
        <p>{poll.description}</p>
        <form
          className='Poll'
          onSubmit={this.handleSubmit}
        >
          <div className='options'>
            {this.renderOptions(poll.polloptions)}
          </div>
          <button className='vote_button' type='submit' 
                  disabled={poll.currentVote}>
            Vote
          </button>
        </form>
      </section>
    )
  }
}
