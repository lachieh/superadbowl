import React from 'react';

const Meta = props => (
	<div className="meta">
		<div className="meta__text meta__text--title">{props.title}</div>
		<div className="meta__text meta__text--client">{props.client}</div>
		<div className="meta__text meta__text--agency">{props.agency}</div>
	</div>
);

export default Meta;
