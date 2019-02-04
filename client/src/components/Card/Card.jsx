import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Ratings from '../Ratings/Ratings';
import Video from '../Video';

import './Card.scss';
import './Meta.scss';

export default class Card extends Component {
    render() {
        const { title, company, url, id, voteCount, userVotes, loggedIn } = this.props;
        return (
          <div className="Card">
            <div className="Card__content Card__content--nopad">
              <Video url={url} title={title} />
              <div className="Meta">
                <h2 className="Meta__video-title">{title}</h2>
                <h3 className="Meta__company">{company}</h3>
              </div>
            </div>
            <div className="Card__bottom">
              <Ratings id={id}
                loggedIn={loggedIn}
                voteCount={voteCount}
                userVotes={userVotes}
              />
            </div>
          </div>
        )
    }
}

Card.propTypes = {
  title: PropTypes.string,
  company: PropTypes.string,
  url: PropTypes.string,
  id: PropTypes.number,
  voteCount: PropTypes.shape({
    laugh: PropTypes.number,
    cry: PropTypes.number,
    heart: PropTypes.number,
    poop: PropTypes.number,
  }),
  userVotes: PropTypes.array,
  loggedIn: PropTypes.bool,
}

Card.defaultProps = {
  title: 'Untitled',
  company: 'Unknown',
  url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  id: 1,
  voteCount: {
    laugh: 0,
    heart: 0,
    cry: 0,
    poop: 0,
  },
  userVotes: [],
  loggedIn: false,
}
