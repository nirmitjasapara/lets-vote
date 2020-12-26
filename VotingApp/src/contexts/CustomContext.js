import React, { Component } from 'react'

const CustomContext = React.createContext({
  polls: [],
  poll: null,
  error: null,
  setError: () => {},
  clearError: () => { },
  setPolls: () => {},
  clearPolls: () => {},
  setPoll: () => {},
  addCurrentVote: () => {},
  clearPoll: () => {}
})

export default CustomContext

export class CustomProvider extends Component {
  state = {
    polls: [],
    poll: null,
    vote: null,
    error: null
  };

  setError = error => {
    console.error(error)
    this.setState({ error })
  }

  clearError = () => {
    this.setState({ error: null })
  }
  setPolls = polls => {
    this.setState({ polls })
  }
  clearPolls = () => {
    this.setState({ polls: [] })
  }
  setPoll = poll => {
    this.setState({ poll })
  }
  addCurrentVote = vote => {
    this.setState({ vote })
  }
  clearPoll = () => {
    this.setState({ poll: null, vote: null })
  }
  render() {
    const value = {
      polls: this.state.polls,
      setPolls: this.setPolls,
      clearPolls: this.clearPolls,
      poll: {...this.state.poll, currentVote: this.state.vote},
      setPoll: this.setPoll,
      addCurrentVote: this.addCurrentVote,
      clearPoll: this.clearPoll,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
    }
    return (
      <CustomContext.Provider value={value}>
        {this.props.children}
      </CustomContext.Provider>
    )
  }
}