import React, { Component } from 'react'
import { Button, Input, InputArea, Required } from '../Utils/Utils'
import ApiService from '../../services/api-service'

export default class AddForm extends Component {
  static defaultProps = {
    onAddSuccess: () => {}
  }

  state = { error: null , options: [ "" ]}

  handleSubmit = ev => {
    ev.preventDefault()
    this.setState({ error: null })
    const { name, description } = ev.target
    const { options } = this.state

    ApiService.addPoll({
      name: name.value,
      description: description.value,
      options
    })
      .then(res => {
        name.value = ''
        description.value = ''
        this.setState({ options: 1 })
        this.props.onAddSuccess()
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  renderOptions() {
    const { options } = this.state
    return options.map((x, i) =>
      <div className='opt_box'>
        <Input
          name='options'
          placeholder="Enter Option"
          type='text'
          required
          value={x}
          onChange={e => this.handleInputChange(e, i)}
          id={'AddForm__options' + i}>
        </Input>
        <div className="btn_box">
          {options.length !== 1 && <button
            className="mr10"
            onClick={() => this.handleRemoveClick(i)}>Remove</button>}
          {options.length - 1 === i && <button onClick={this.handleAddClick}>Add</button>}
        </div>
      </div>
    )
  }
  // handle input change
  handleInputChange(e, i) {
    const { options } = this.state
    const list = [...options];
    list[i] = e.target.value;
    this.setState({ options: list })
  }
 
  // handle click event of the Remove button
  handleRemoveClick (i) {
    const { options } = this.state
    const list = [...options];
    list.splice(i, 1);
    this.setState({ options: list })
  }
 
  // handle click event of the Add button
  handleAddClick () {
    const { options } = this.state
    this.setState({ options: [...options, ""] })
  }

  render() {
    const { error } = this.state
    return (
      <form
        className='AddForm'
        onSubmit={this.handleSubmit}
      >
        <div role='alert'>
          {error && <p className='red'>{error}</p>}
        </div>
        <div className='name'>
          <label htmlFor='AddForm__name'>
            Name <Required />
          </label>
          <Input
            name='name'
            type='text'
            required
            id='AddForm__name'>
          </Input>
        </div>
        <div className='description'>
          <label htmlFor='AddForm__description'>
            Name <Required />
          </label>
          <InputArea
            name='description'
            type='text'
            required
            rows="4"
            cols="50"
            id='AddForm__description'>
          </InputArea>
        </div>

        <div className='options'>
          <label htmlFor='AddForm__options'>
            Name <Required />
          </label>
          {this.renderOptions()}
        </div>
        <Button type='submit'>
          Add
        </Button>
      </form>
    )
  }
}
