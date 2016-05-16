import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

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