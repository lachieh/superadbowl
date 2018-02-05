import React from 'react';

class User extends React.Component {
	constructor() {
		super();

		this.toggleUserMenu = this.toggleUserMenu.bind(this);

		this.state = {
			open: false,
		};
	}

	toggleUserMenu() {
		this.setState({
			open: !this.state.open,
		});
	}

	render() {
		return (
			<div className="user">
				<div
					className="user__icon"
					style={{backgroundImage: `url(${this.props.details.photoUrl})`}}
					onClick={this.toggleUserMenu}
				>
					Profile
				</div>
				{this.state.open && (
					<div className="user__menu">
						<ul className="user__details-list">
							<li className="user__details user__details--name">
								<span className="user__text user__text--name">
									{this.props.details.displayName}
								</span>
							</li>
							<li className="user__details user__details--email">
								<span className="user__text user__text--email">
									{this.props.details.email}
								</span>
							</li>
							<li
								className="user__details user__details--logout"
								onClick={this.props.logout}
							>
								<span className="user__text user__text--logout">Sign Out</span>
							</li>
						</ul>
					</div>
				)}
			</div>
		);
	}
}

export default User;
