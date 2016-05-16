import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Events } from '../lib/events.js';

Meteor.methods({
	insertImgEvent: function(attr) {
		check(attr, {
			title: String,
			start: Date,
			end: Date,
			location: String,
			description: String,
			src: String
		});
		if (! this.userId) {
			throw new Meteor.Error('not-authorized');
		}

		return Events.insert({
			title: attr.title,
			start: attr.start,
			end: attr.end,
			location: attr.location,
			description: attr.description,
			createdBy: Meteor.users.findOne(this.userId).username,
			src: attr.src
		});
	},
	insertEvent: function(attr) {
		check(attr, {
			title: String,
			start: Date,
			end: Date,
			location: String,
			description: String
		});
		if (! this.userId) {
			throw new Meteor.Error('not-authorized');
		}

		return Events.insert({
			title: attr.title,
			start: attr.start,
			end: attr.end,
			location: attr.location,
			description: attr.description,
			createdBy: Meteor.users.findOne(this.userId).username,
		});
	},
	removeEvent: function(eventId, username) {
		check(eventId, String);
		check(username, String);
		if (! this.userId || Meteor.users.findOne(this.userId).username != username) {
			throw new Meteor.Error('user-not-authorized');
		}
		Events.remove(id);
	},
	toggleInterest: function(eventId) {
		check(eventId, String);
		const user = Meteor.users.findOne(this.userId);
		if(Array.isArray(user.interested) && user.interested.indexOf(eventId) > -1){
			console.log(user.interested);
			Meteor.users.update({_id: this.userId}, { $pull: {interested: eventId} });
			return false;
		} else {
			console.log(user.interested);
			Meteor.users.update({_id: this.userId}, { $push: {interested: eventId} });
			Meteor.users.update({_id: this.userId}, { $pull: {going: eventId} });
			return true;
		}

	},
	toggleGoing: function(eventId) {
		check(eventId, String);
		const user = Meteor.users.findOne(this.userId);
		if(Array.isArray(user.going) && user.going.indexOf(eventId) > -1){
			console.log(user.going);
			Meteor.users.update({_id: this.userId}, { $pull: {going: eventId} });
			return false;
		} else {
			console.log(user.going);
			Meteor.users.update({_id: this.userId}, { $push: {going: eventId} });
			Meteor.users.update({_id: this.userId}, { $pull: {interested: eventId} });
			return true;
		}

	}
});