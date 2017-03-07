import React, {PropTypes, Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import '../css/plugins/bootstrap-reboot.css';
import '../css/plugins/bootstrap-grid.css';
import '../css/plugins/bootstrap.css';
import '../css/utils/global.css';

import Styles from '../css/modules/application.css';

const mapStateToProps = state => ({
	...state
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({}, dispatch)
});

@connect(mapStateToProps, mapDispatchToProps)
export default class Application extends Component {
	static propTypes = {
		children: PropTypes.element.isRequired
	};

	render() {
		const {children} = this.props;

		return (
			<div className={Styles.app}>
				{children}
			</div>
		);
	}
}
