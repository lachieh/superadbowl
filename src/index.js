import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter, Match, Miss} from 'react-router';

import './css/style.css';

import App from './components/App';
import Admin from './components/Admin';
import NotFound from './components/NotFound';

const Root = () => (
	<BrowserRouter>
		<div>
			<Match exactly pattern="/" component={App} />
			<Match exactly pattern="/admin" component={Admin} />
			<Miss component={NotFound} />
		</div>
	</BrowserRouter>
);

render(<Root />, document.querySelector('#main'));
