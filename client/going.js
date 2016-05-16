import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Events } from '../lib/events.js';
import { Session } from 'meteor/session';

Template.going.onCreated(() => {
	Meteor.subscribe('userData');
});

Template.going.helpers({
	marked() {
		let a = Array.isArray(Meteor.user().going);
		let b = (Meteor.user().going.length > 0);
		return a && b;
	},
	events() {
		let result = [];
		for(let i=0; i<Meteor.user().going.length; i++){
			result.push(Events.findOne({_id: Meteor.user().going[i]}));
		}
		return result;
	}
});