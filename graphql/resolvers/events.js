const Event = require('../../models/event')
const User = require('../../models/user')
const { transformEvent } = require('./merge')

module.exports = {
	events: async () => {
		const events = await Event.find()
		try {
			return events.map(event => {
				return transformEvent(event)
			})
		} catch (err) {
			throw err
		}
	},
	createEvent: async (args, req) => {
		if(!req.isAuth) {
			throw new Error('Unauthorize')
		}
		const event = new Event({
			title: args.eventInput.title,
			description: args.eventInput.description,
			price: +args.eventInput.price,
			date: new Date(args.eventInput.date),
			creator: req.userId
		})
		let createdEvent
		try {
			const result = await event.save()
			createdEvent = transformEvent(result)
			const creatorUser = await User.findById(req.userId)
			if (!creatorUser) {
				throw new Error('User not found.')
			}
			creatorUser.createdEvents.push(event)
			await creatorUser.save()
			return createdEvent
		} catch (err) {
			console.log('Error:', err)
			throw err
		}
	}
}
