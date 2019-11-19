import React from 'react'

import './EventItem.css'

const eventItem = props => (
	<li key={props.eventId} className="event__list__item">
		<div>
			<h1>{props.title}</h1>
			<h2>${props.price} - {new Date(props.date).toLocaleDateString('es-PE')}</h2>
		</div>
		<div>
			{props.userId === props.creatorId ? (
				<p>You're the owner of this event.</p>
			) : (
				<button className="btn" onClick={props.onDetail.bind(this, props.eventId)}>View Details</button>
			)}
		</div>
	</li>
)

export default eventItem
