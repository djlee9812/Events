import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Events } from '../lib/events.js';
import './home.html';

Template.home.helpers({
	events() {
		return Events.find({}, {sort: {start: 1}});
	},
});