import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Events } from '../lib/events.js';
import { Session } from 'meteor/session';
import { EventsIndex } from '../lib/events.js';

import './home.html';

Template.home.onRendered(() => {

});

Template.home.helpers({
	events() {
		if(Session.get("search-text")){
			const text = Session.get("search-text");
			return EventsIndex.search(text).mongoCursor;
		} else {
			return Events.find({}, {sort: {start: 1}});
		}
	},
});