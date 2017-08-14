import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import Logo from '../images/logo.png';

import Styles from '../css/modules/home.css';

const ContactInfo = {
	email: 'maxbaun@gmail.com',
	phone: '978.325.0506'
};

const mapStateToProps = state => ({
	...state
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({}, dispatch)
});

@connect(mapStateToProps, mapDispatchToProps)
export default class Home extends Component {
	render() {
		return (
			<div className={Styles.home}>
				<div className={Styles.homeInner}>
					<img className={Styles.logo} src={Logo}/>
					<h3 className={Styles.comingSoon}>Coming Soonnnn</h3>
					<div className={Styles.contact}>
						<span className={Styles.email}>{ContactInfo.email}</span>
						<span className={Styles.phone}>{ContactInfo.phone}</span>
					</div>
					<div className={Styles.social}>
						<a className={Styles.facebookIcon} href="https://facebook.com/max.baun"/>
						<a className={Styles.instagramIcon} href="https://facebook.com/maxbaun"/>
						<a className={Styles.soundcloudIcon} href="https://soundcloud.com/maxbaun"/>
						<a className={Styles.mixcloudIcon} href="https://mixcloud.com/maxbaun"/>
					</div>
				</div>
			</div>
		);
	}
}
