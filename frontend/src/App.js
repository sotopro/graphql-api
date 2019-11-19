import React, { Component } from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import './App.css'

import AuthPage from './pages/Auth'
import BookingsPage from './pages/Bookings'
import EventsPage from './pages/Events'
import MainNavigation from './components/Navigation/MainNavigation'
import SideDrawer from './components/SideDrawer/SideDrawer'
import Backdrop from './components/Backdrop/Backdrop'
import AuthContext from './context/auth-context'

class App extends Component {
	state = {
		sideDrawerOpen: false,
		token: null,
		userId: null
	}
	drawerToggleClickHandler = () => {
		this.setState(prevState => {
			return { sideDrawerOpen: !prevState.sideDrawerOpen }
		})
	}
	backdropClickHandler = () => {
		this.setState({
			sideDrawerOpen: false
		})
	}
	login = (token, userId, tokenExpiration) => {
		this.setState({ token: token, userId: userId })
	}
	logout = () => {
		this.setState({ token: null, userId: null, sideDrawerOpen: false })
	}
	render() {
		let backdrop
		if (this.state.sideDrawerOpen) {
			backdrop = <Backdrop click={this.backdropClickHandler} />
		}
		return (
			<div style={{ height: '100%' }}>
				<BrowserRouter>
					<React.Fragment>
						<AuthContext.Provider
							value={{
								token: this.state.token,
								userId: this.state.userId,
								login: this.login,
								logout: this.logout
							}}
						>
							<MainNavigation
								drawerClickHandler={this.drawerToggleClickHandler}
							/>
							<SideDrawer show={this.state.sideDrawerOpen} />
							{backdrop}
							<main className="main-content">
								<Switch>
									{this.state.token && <Redirect from="/" to="/events" exact />}
									{this.state.token && (
										<Redirect from="/auth" to="/events" exact />
									)}
									{!this.state.token && (
										<Route path="/auth" component={AuthPage} />
									)}
									<Route path="/events" component={EventsPage} />
									{this.state.token && (
										<Route path="/bookings" component={BookingsPage} />
									)}
									{!this.state.token && <Redirect to="/auth" exact />}
								</Switch>
							</main>
						</AuthContext.Provider>
					</React.Fragment>
				</BrowserRouter>
			</div>
		)
	}
}

export default App
