import React from 'react';
import YouTube from 'react-youtube';

class Player extends React.Component {
	render() {
		const opts = {
			playerVars: {
				modestbranding: 0,
				showinfo: 0,
				rel: 0,
			},
		};

		return (
			<YouTube
				videoId={this.props.video}
				id={`video_${this.props.video}`}
				opts={opts}
				className="video__iframe"
			/>
		);
	}
}

export default Player;
