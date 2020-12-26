import React, { Component } from 'react'
import { Button, Input, InputArea, Required } from '../Utils/Utils'
import ApiService from '../../services/api-service'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons'
import './AddForm.css'

export default class AddForm extends Component {
  static defaultProps = {
    onAddSuccess: () => {}
  }

  state = { error: null , options: [ "", "" ]}

  handleSubmit = ev => {
    ev.preventDefault()
    this.setState({ error: null })
    const { name, description } = ev.target
    const { options } = this.state

    console.log(options);
    ApiService.addPoll({
      name: name.value,
      description: description.value,
      options
    })
      .then(res => {
        name.value = ''
        description.value = ''
        this.setState({ options: [ "", "" ] })
        this.props.onAddSuccess()
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  renderOptions() {
    const { options } = this.state
    return options.map((x, i) =>
      <div key={'AddForm__options' + i} className='opt_box'>
        <Input
          name='options'
          placeholder="Enter Option"
          type='text'
          required
          value={x}
          onChange={e => this.handleInputChange(e, i)}
          style={{"display": "inline"}}
          id={'AddForm__options' + i}>
        </Input>
        <span className="btn_box">
          {options.length > 2 && 
            <button onClick={() => this.handleRemoveClick(i)}>
              <FontAwesomeIcon icon={faMinusCircle} className="icons"/>
            </button>
          }
          {options.length - 1 === i && 
            <button onClick={() => this.handleAddClick()}>
              <FontAwesomeIcon icon={faPlusCircle} className="icons"/>
            </button>
          }
        </span>
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
            Description <Required />
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
            Options <Required />
          </label>
          {this.renderOptions()}
        </div>
        <Button type='submit'>
          Add Poll
        </Button>
      </form>
    )
  }
}
