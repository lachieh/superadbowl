import React from 'react';
import YouTube from 'react-youtube';
import VisibilitySensor from 'react-visibility-sensor';

class Player extends React.Component {
	constructor() {
		super();

		this.setVisibility = this.setVisibility.bind(this);

		this.state = {
			loaded: false,
			visible: false,
		};
	}

	setVisibility(isVisible) {
		if (!this.state.loaded && isVisible) {
			this.setState({
				loaded: true,
				visible: isVisible,
			});
		} else {
			this.setState({
				visible: isVisible,
			});
		}
	}

	render() {
		const opts = {
			playerVars: {
				modestbranding: 0,
				showinfo: 0,
				rel: 0,
			},
		};
		let contents = <div className="video__placeholder" />;
		if (this.state.loaded || this.state.visible) {
			contents = (
				<div className="video__inner">
					<div className="video__placeholder">
						<span>Loading...</span>
					</div>
					<YouTube
						videoId={this.props.video}
						id={`video_${this.props.video}`}
						opts={opts}
						className="video__iframe"
					/>
				</div>
			);
		}

		return (
			<div className="video__wrapper">
				<div className="visibilitySensor">
					<VisibilitySensor onChange={this.setVisibility} />
				</div>
				{contents}
			</div>
		);
	}
}

export default Player;
