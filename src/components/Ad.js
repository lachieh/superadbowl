import React from 'react';

import Player from './Player';
import Meta from './Meta';
import ThumbsUp from './ThumbsUp';

class Ad extends React.Component {
	handleToggleVote = () => {
		this.props.toggleVote(this.props.index);
	};

	render() {
		const voted = this.props.votes[this.props.uid]
			? 'vote__button--voted'
			: 'vote__button--not-voted';
		return (
			<div className="ad">
				<div className="ad__video">
					<div className="video">
						<Player video={this.props.details.youtubeId} />
					</div>
				</div>
				<div className="ad__details">
					<Meta
						title={this.props.details.title}
						client={this.props.details.client}
						agency={this.props.details.agency}
					/>
					<div className="vote">
						<div className="vote__total">
							<span className="vote__total-text">Votes: </span>
							<span className="vote__number">
								{Object.keys(this.props.votes).length}
							</span>
						</div>
						<div
							onClick={this.handleToggleVote}
							className={`vote__button ${voted}`}
						>
							<ThumbsUp />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Ad;
