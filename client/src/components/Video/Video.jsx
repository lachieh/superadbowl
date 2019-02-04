import React, { Component } from 'react'
import PropTypes from 'prop-types'
import VisibilitySensor from 'react-visibility-sensor';

import './Video.scss';

export default class Video extends Component {
    constructor(props) {
      super(props);

      this.state = {
        url: this.props.url,
      };

      const check = /(?:watch.*?v=)([A-Za-z0-9_]+)(?:&.*)?/i;
      if (RegExp(check).test(this.props.url)) {
        const matches = this.props.url.match(check);
        this.state.url = `https://www.youtube.com/embed/${matches[1]}`;
      }
    }
    render() {
      const { title } = this.props;
      const { url } = this.state;

      return (
        <VisibilitySensor>
          {(isVisible) => (
            <div className="Video">
              {isVisible ? (
                <div className="Video__container">
                  <div className="Video__loading">
                    <span className="Video__loading-text">Loading...</span>
                  </div>
                  <iframe src={url} title={title} className="Video__iframe"></iframe>
                </div>
              ) : (
                <div className="Video__placeholder"></div>
              )}
            </div>
          )}
        </VisibilitySensor>
      );
    }
}

Video.propTypes = {
    url: PropTypes.string,
    title: PropTypes.string,
}
