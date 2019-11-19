import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import AuthContext from '../../context/auth-context'
import './SideDrawer.css'

let drawerClasses = ''

export default class sideDrawer extends Component {
	constructor(props) {
		super(props)
	}

	static contextType = AuthContext
	render() {
		const drawerClassName = this.props.show
			? (drawerClasses = 'side-drawer open')
			: (drawerClasses = 'side-drawer')
		return (
			<nav className={drawerClassName}>
				<ul>
					{!this.context.token && (
						<li>
							<NavLink to="/auth">Authenticate</NavLink>
						</li>
					)}
					<li>
						<NavLink to="/events">Events</NavLink>
					</li>
					{this.context.token && (
						<React.Fragment>
							<li>
								<NavLink to="/bookings">Bookings</NavLink>
							</li>
							<li>
								<button className="logout" onClick={this.context.logout}>
									Logout
								</button>
							</li>
						</React.Fragment>
					)}
				</ul>
			</nav>
		)
	}
}
