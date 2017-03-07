import 'react';

import Application from './containers/application';
import Home from './containers/home';

const Routes = {
	component: Application,
	childRoutes: [
		{
			path: '/',
			component: Home
		}
	]
};

export default Routes;
