import React from 'react';

import Ad from './Ad';
import User from './User';
import base from '../base';

class App extends React.Component {
	constructor() {
		super();

		// Authentication
		this.authenticate = this.authenticate.bind(this);
		this.authHandler = this.authHandler.bind(this);
		this.logout = this.logout.bind(this);

		// Voting
		this.toggleVote = this.toggleVote.bind(this);
		this.applyVotes = this.applyVotes.bind(this);
		this.userHasVotedOnVideo = this.userHasVotedOnVideo.bind(this);
		this.reachedVoteLimit = this.reachedVoteLimit.bind(this);

		this.state = {
			videos: {},
			users: {},
			uid: null,
			votes: {},
		};
	}

	authenticate() {
		base.authWithOAuthPopup('google', this.authHandler);
	}

	authHandler(err, authData) {
		if (err) {
			console.error(err);
		} else {
			const users = {...this.state.users};
			base
				.database()
				.ref(`users/${authData.user.uid}`)
				.once('value')
				.then(data => {
					const userValues = data.val();
					if (userValues) {
						users[authData.user.uid] = {
							lastLoggedIn: Date.now(),
							email: authData.user.email,
							voteCount: userValues.voteCount,
							displayName: authData.user.displayName,
							photoUrl: authData.user.photoURL,
							votes: userValues.votes || {},
						};
					} else {
						users[authData.user.uid] = {
							lastLoggedIn: Date.now(),
							email: authData.user.email,
							voteCount: 0,
							displayName: authData.user.displayName,
							photoUrl: authData.user.photoURL,
							votes: {},
						};
					}
					this.setState({
						uid: authData.user.uid,
						users,
					});
				});
		}
	}

	logout() {
		base.unauth();
		this.setState({
			uid: null,
			users: {},
		});
	}

	toggleVote(key) {
		if (this.userHasVotedOnVideo(key)) {
			this.applyVotes({key, remove: true});
		} else {
			if (this.reachedVoteLimit() !== true) {
				this.applyVotes({key});
			} else {
				alert(
					"You've reached your maximum of three votes!\nRemove one if you want to vote again!"
				);
			}
		}
	}

	applyVotes({key, remove = false} = {}) {
		const votesRef = base.database().ref(`votes/${key}`);
		const users = {...this.state.users};
		if (typeof users[this.state.uid].votes === 'undefined') {
			users[this.state.uid].votes = {};
		}
		if (typeof users[this.state.uid].voteCount === 'undefined') {
			users[this.state.uid].voteCount = 0;
		}

		if (remove) {
			votesRef.child(this.state.uid).remove();
			users[this.state.uid].votes[key] = null;
			users[this.state.uid].voteCount -= 1;
		} else {
			votesRef.child(this.state.uid).set(true);
			users[this.state.uid].votes[key] = true;
			users[this.state.uid].voteCount += 1;
		}

		this.setState({
			users,
		});
	}

	userHasVotedOnVideo(key) {
		if (
			typeof this.state.users[this.state.uid].votes !== 'undefined' &&
			this.state.users[this.state.uid].votes[key]
		) {
			return true;
		} else {
			return false;
		}
	}

	reachedVoteLimit() {
		if (
			this.state.users[this.state.uid].voteCount &&
			this.state.users[this.state.uid].voteCount >= 3
		) {
			return true;
		}
		return false;
	}

	componentWillMount() {
		this.refUsers = base.syncState('users', {
			context: this,
			state: 'users',
		});
		this.refVideos = base.bindToState('videos', {
			context: this,
			state: 'videos',
		});
		this.refVotes = base.bindToState('votes', {
			context: this,
			state: 'votes',
		});
	}

	componentDidMount() {
		base.onAuth(user => {
			if (user) {
				this.authHandler(null, {user});
			}
		});
	}

	componentWillUnmount() {
		base.removeBinding(this.refVideos);
		base.removeBinding(this.refUsers);
		base.removeBinding(this.refVotes);
	}

	render() {
		let user = (
			<div className="login">
				<button className="login__button" onClick={() => this.authenticate()}>
					Log In
				</button>
			</div>
		);
		let toggleVote = () => alert('You must be logged in to vote!');

		if (this.state.uid) {
			user = (
				<User details={this.state.users[this.state.uid]} logout={this.logout} />
			);
			toggleVote = this.toggleVote;
		}

		return (
			<div className="app">
				<header className="header">
					<div className="header__container">
						<div className="logo">🏈</div>
						{user}
					</div>
				</header>
				<div className="ads">
					{Object.keys(this.state.videos).map(key => (
						<Ad
							key={key}
							index={key}
							details={this.state.videos[key]}
							votes={this.state.votes[key] || {}}
							uid={this.state.uid}
							toggleVote={toggleVote}
						/>
					))}
				</div>
			</div>
		);
	}
}

export default App;
