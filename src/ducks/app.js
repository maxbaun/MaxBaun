import * as utils from '../utils/duckHelpers';
import {fromJS, List} from 'immutable';

export const types = {
	OFFMENU_TOGGLE: 'OFFMENU_TOGGLE',
	ADD_APP_MESSAGE: 'ADD_APP_MESSAGE',
	REMOVE_APP_MESSAGE: 'REMOVE_APP_MESSAGE',
	FETCH_START: 'FETCH_START',
	FETCH_END: 'FETCH_END',
	RETRY_ACTION: 'RETRY_ACTION'
};

export const actions = {
	offmenuToggle: payload => utils.action(types.OFFMENU_TOGGLE, {payload}),
	addAppMessage: payload => utils.action(types.ADD_APP_MESSAGE, {payload}),
	removeAppMessage: payload => utils.action(types.REMOVE_APP_MESSAGE, {payload}),
	retryAction: payload => utils.action(types.RETRY_ACTION, {payload})
};

export const initialState = utils.initialState({
	activeProject: false,
	appMessages: List(),
	fetchRequestCount: 0
});

export default (state = initialState, action) => {
	switch (action.type) {
		case types.OFFMENU_TOGGLE:
			return state.set(action.payload, !state.get(action.payload));
		case types.ADD_APP_MESSAGE:
			return state.set('appMessages', state.get('appMessages').push(fromJS(action.payload)));
		case types.REMOVE_APP_MESSAGE:
			return state.set('appMessages', state.get('appMessages').filter(message => message.get('id') !== action.payload));
		case types.FETCH_START:
			return state.set('fetchRequestCount', state.get('fetchRequestCount') + 1);
		case types.FETCH_END:
			return state.set('fetchRequestCount', state.get('fetchRequestCount') - 1);

		default:
			return state;
	}
};

export const selectors = {
	getActiveProject: state => state.getIn(['app', 'activeProject']),
	isModalOpen: state => {
		return selectors.getActiveProject(state);
	},
	getAppMessages: state => state.getIn(['app', 'appMessages']),
	isFetching: state => Boolean(state.getIn(['app', 'fetchRequestCount']))
};
