import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Router, browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import store from './store';
import routes from './routes';

const data = store(browserHistory);

const history = syncHistoryWithStore(browserHistory, data, {
	selectLocationState(state) {
		return state.get('routing').toJS();
	}
});

render(
	<Provider store={data}>
		<Router history={history} routes={routes}/>
	</Provider>,
	document.getElementById('app')
);
