import React, { Component } from 'react'

const CustomContext = React.createContext({
  polls: [],
  error: null,
  setError: () => {},
  clearError: () => { },
  setPolls: () => {},
  clearPolls: () => {}
})

export default CustomContext

export class CustomProvider extends Component {
  state = {
    polls: [],
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
  render() {
    const value = {
      polls: this.state.polls,
      setPolls: this.setPolls,
      clearPolls: this.clearPolls,
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