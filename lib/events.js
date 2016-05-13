export const Events = new Mongo.Collection('events');

export const EventsIndex = new EasySearch.Index({
	collection: Events,
	fields: ['title', 'createdBy', 'description', 'location'],
	engine: new EasySearch.Minimongo({
		sort: function() {
			return {start: 1};
		}
		
	})
});

/*
Events.attachSchema(new SimpleSchema({
	title: {
		type: String,
		label: "Title",
	},
	start: {
		type: Date,
		label: "Start Time"
	},
	end: {
		type: Date,
		label: "End Time"
	},
	location: {
		type: String,
		label: "Location"
	}
}));*/