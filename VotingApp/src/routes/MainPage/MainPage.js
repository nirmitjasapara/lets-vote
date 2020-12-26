import React, { Component } from 'react'
import CustomContext from '../../contexts/CustomContext';
import ApiService from '../../services/api-service';
import TokenService from '../../services/token-service';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import './MainPage.css'
import '../../components/App/App.css'
import Poll from '../../components/Poll/Poll';

export default class MainPage extends Component {
  static contextType = CustomContext

  static defaultProps = {
    history: {
      push: () => {},
    },
  }

  handleVoteSuccess = (polloption_id) => {
    this.context.addCurrentVote({'id': polloption_id});
  }

  componentDidMount() {
    this.context.clearError();
    this.context.clearPoll();
    ApiService.getPolls()
      .then(this.context.setPolls)
      .catch(this.context.setError)
  }

  componentDidUpdate(prevProps) {
    const { pollId } = this.props.match.params;
    console.log({'now': this.props, 'prev': prevProps,
                'nowId': pollId, 'previd': prevProps.match.params.pollId});
    if (prevProps.match.params.pollId !== pollId)
    {
        this.context.clearPoll();
        if (pollId != null)
        {
          ApiService.getPoll(pollId)
            .then(this.context.setPoll)
            .catch(this.context.setError)
          if (TokenService.hasAuthToken())
          {
            ApiService.getVote(pollId)
              .then(v => {
                if(v.length)
                  this.context.addCurrentVote(v[0].id);
              })
              .catch(this.context.setError)
          }
        }
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
        {error ? <p className='red'>There was an error, try again</p> : 
          <div className='frame'>
            <div className='nav'>
              {this.renderPollList()}
            </div>
            <div className='main'>
              {(this.context.poll.id!=null) ? 
                <Poll onVoteSuccess={this.handleVoteSuccess}/> :
                <h3 className='default'>Please select a poll</h3> }
            </div>
          </div>
        }
      <Link
          to='/add'
          type='button'
          className='add-button'
        ><FontAwesomeIcon icon={faPlus} className="icon"/></Link>
      </div>
    )
  }
}