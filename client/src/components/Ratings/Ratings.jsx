import React, { Component } from 'react'

import './Ratings.scss';
import VoteButton from '../VoteButton/VoteButton';

export default class Ratings extends Component {
    constructor() {
        super();
        this.state = {
            votes: {
                laugh: false,
                heart: false,
                cry: false,
                poop: false,
            }
        }

        this.handleVoteClick = this.handleVoteClick.bind(this);
    }

    handleVoteClick(event) {
        event.preventDefault();
        const { id } = event.target.dataset;
        const votes = {...this.state.votes};
        votes[id] = !this.state.votes[id];
        this.setState({ votes });
    }

    render() {
        return (
        <ul className="Ratings">
            <li className="Ratings__item">
                <VoteButton
                    onClick={this.handleVoteClick}
                    active={this.state.votes.laugh}
                    id="laugh" emoji="😂" count={5}
                    color={{r: 20, g: 255, b: 0 }}/>
            </li>
            <li className="Ratings__item">
                <VoteButton
                    onClick={this.handleVoteClick}
                    active={this.state.votes.heart}
                    id="heart" emoji="❤️" count={5}
                    color={{r: 255, g: 0, b: 0 }}/>
            </li>
            <li className="Ratings__item">
                <VoteButton
                    onClick={this.handleVoteClick}
                    active={this.state.votes.cry}
                    id="cry" emoji="😭" count={5}
                    color={{r: 0, g: 144, b: 255 }}/>
            </li>
            <li className="Ratings__item">
                <VoteButton
                    onClick={this.handleVoteClick}
                    active={this.state.votes.poop}
                    id="poop" emoji="💩" count={5}
                    color={{r: 123, g: 0, b: 0 }}/>
            </li>
        </ul>
        )
    }
}
