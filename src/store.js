import {createStore, applyMiddleware, compose} from 'redux';
import {routerMiddleware} from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import createLogger from 'redux-logger';
import {Map} from 'immutable';
import Ducks from './ducks/root';
import Sagas from './sagas/root';

const store = browserHistory => {
	const initialState = Map();
	const history = routerMiddleware(browserHistory);
	const sagaMiddleware = createSagaMiddleware();
	const middlewares = [history, sagaMiddleware];
	let composeEnhancers = compose;

	if (process.env.NODE_ENV !== 'production') {
		middlewares.push(createLogger());

		composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
	}

	const DataStore = createStore(
		Ducks,
		initialState,
		composeEnhancers(applyMiddleware(...middlewares))
	);

	sagaMiddleware.run(Sagas);

	return DataStore;
};

export default store;
