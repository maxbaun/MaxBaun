import {LOCATION_CHANGE} from 'react-router-redux';
import * as utils from '../utils/duckHelpers';
import {fromJS} from 'immutable';

export const types = {
	LOCATION_PUSH: 'LOCATION_PUSH',
	LOCATION_CHANGE: LOCATION_CHANGE,
	LEGACY_LOCATION_CHANGE: 'LEGACY_LOCATION_CHANGE'
};

export const actions = {
	locationPush: payload => utils.action(types.LOCATION_PUSH, payload),
	legacyLocationChange: payload => utils.action(types.LEGACY_LOCATION_CHANGE, payload)
};

const initialState = utils.initialState({
	locationBeforeTransitions: null
});

export default (state = initialState, action) => {
	switch (action.type) {
		case types.LOCATION_CHANGE:
			return state.set('locationBeforeTransitions', fromJS(action.payload));
		default:
			return state;
	}
};

export const selectors = {
	getLocation: state => state.getIn(['routing', 'locationBeforeTransitions']),
	getPathname: state => selectors.getLocation(state).get('pathname'),
	getQuery: state => selectors.getLocation(state).get('query'),
	getParams: state => state.getIn(['routing', 'params'])
};
