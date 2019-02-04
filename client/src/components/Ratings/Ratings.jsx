import React, { Component } from 'react'
import axios from 'axios';

import './Ratings.scss';
import VoteButton from '../VoteButton/VoteButton';

export default class Ratings extends Component {
  constructor(props) {
    super(props);

    this.handleVoteClick = this.handleVoteClick.bind(this);
    this.addVote = this.addVote.bind(this);
    this.removeVote = this.removeVote.bind(this);
  }

  addVote(type) {
    if (this.props.loggedIn) {
      axios.post('/api/vote', {
        vid: this.props.id,
        type
      })
    }
  }

  removeVote(type) {
    if (this.props.loggedIn) {
      axios.post('/api/vote/delete', {
        vid: this.props.id,
        type
      })
    }
  }

  handleVoteClick(event) {
    event.preventDefault();
    if (this.props.loggedIn) {
      const { type } = event.target.dataset;
      if (this.props.userVotes.indexOf(type) === -1) {
        this.addVote(type);
      } else {
        this.removeVote(type);
      }
    }
  }

  render() {
    const { laugh, heart, cry, poop } = this.props.voteCount;
    return (
      <ul className="Ratings">
        <li className="Ratings__item">
          <VoteButton
            onClick={this.handleVoteClick}
            active={this.props.userVotes.indexOf('laugh') >= 0}
            type="laugh" emoji="😂"
            count={laugh ? laugh : 0}
            color={{r: 20, g: 255, b: 0 }}
          />
        </li>
        <li className="Ratings__item">
          <VoteButton
            onClick={this.handleVoteClick}
            active={this.props.userVotes.indexOf('heart') >= 0}
            type="heart" emoji="❤️"
            count={heart ? heart : 0}
            color={{r: 255, g: 0, b: 0 }}
          />
        </li>
        <li className="Ratings__item">
          <VoteButton
            onClick={this.handleVoteClick}
            active={this.props.userVotes.indexOf('cry') >= 0}
            type="cry" emoji="😭"
            count={cry ? cry : 0}
            color={{r: 0, g: 144, b: 255 }
          }/>
        </li>
        <li className="Ratings__item">
          <VoteButton
            onClick={this.handleVoteClick}
            active={this.props.userVotes.indexOf('poop') >= 0}
            type="poop" emoji="💩"
            count={poop ? poop : 0}
            color={{r: 123, g: 0, b: 0 }}
          />
        </li>
      </ul>
    )
  }
}
