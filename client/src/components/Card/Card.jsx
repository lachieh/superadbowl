import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Ratings from '../Ratings/Ratings';
import Video from '../Video';

import './Card.scss';
import './Meta.scss';

export default class Card extends Component {
    render() {
        const { title, company, url, id } = this.props;
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
                    <Ratings id={id} />
                </div>
            </div>
        )
    }
}

Card.propTypes = {
    title: PropTypes.string,
    company: PropTypes.string,
    url: PropTypes.string,
    id: PropTypes.string,
}

Card.defaultProps = {
    title: 'Example Ad/Video Campaign',
    company: 'Example Company Name',
    url: 'https://www.youtube.com/watch?v=B6VciSoR1iQ',
    id: '1',
}
