import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Events } from '../lib/events.js';
import { Session } from 'meteor/session';

Template.interested.onCreated(() => {
	Meteor.subscribe('userData');
})

Template.interested.helpers({
	marked() {
		let a = Array.isArray(Meteor.user().interested);
		let b = (Meteor.user().interested.length > 0);
		return a && b;
	},
	events() {
		let result = [];
		for(let i=0; i<Meteor.user().interested.length; i++){
			result.push(Events.findOne({_id: Meteor.user().interested[i]}));
		}
		return result;		
	}
});