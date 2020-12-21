import React, { Component } from 'react'
import CustomContext from '../../contexts/CustomContext';
import ApiService from '../../services/api-service';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import './MainPage.css'

export default class MainPage extends Component {
  static contextType = CustomContext

  componentDidMount() {
    const { pollId } = this.props.match.params;
    this.context.clearError();
    if (pollId != null)
    {
        ApiService.getPoll(pollId)
          .then(poll => [poll])
          .then(this.context.setPolls)
          .catch(this.context.setError)
    }
    else
    {
        ApiService.getPolls()
          .then(this.context.setPolls)
          .catch(this.context.setError)
    }
  }

  renderPollList() {
    const { polls = [] } = this.context
    return polls.map(p =>
      <Link
          to={'/poll/' + p.id}
          key={'/poll/' + p.id}
          type='button'
          className='list-item'
        ><h3>{p.name}</h3></Link>
    )
  }

  render() {
    const { error } = this.context
    return (
      <div>
        {error
          ? <p className='red'>There was an error, try again</p>
          : this.renderPollList()}
      <Link
          to='/add'
          type='button'
          className='add-button'
        ><FontAwesomeIcon icon={faPlus} className="icon"/></Link>
      </div>
    )
  }
}