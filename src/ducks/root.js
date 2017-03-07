import {combineReducers} from 'redux-immutable';
import app from './app';
import routing from './routing';

const Ducks = combineReducers({
	app,
	routing
});

export default Ducks;
