import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './VoteButton.scss';

export default class VoteButton extends Component {
    render() {
        const { emoji, count, active, onClick, type } = this.props;
        const { r, g, b } = this.props.color;
        const style = {
            backgroundImage: `radial-gradient(
                ellipse 50% 30% at top,
                rgba(${r},${g},${b},0.5),
                rgba(${r},${g},${b},0))`,
        }
        return (
            <button className={`VoteButton ${active ? 'is-active' : ''}`}
                data-type={type} onClick={onClick}>
                <span className="VoteButton__indicator" style={style}></span>
                <span className="VoteButton__emoji">{emoji}</span>
                <span className="VoteButton__count">{count}</span>
            </button>
        )
    }
}

VoteButton.propTypes = {
    active: PropTypes.bool,
    count: PropTypes.number,
    color: PropTypes.shape({
        r: PropTypes.number,
        g: PropTypes.number,
        b: PropTypes.number,
    }),
    type: PropTypes.string,
    emoji: PropTypes.string,
    onClick: PropTypes.func,
}

VoteButton.defaultProps = {
    color: {
        r:20,
        g:200,
        b:0,
    }
}
