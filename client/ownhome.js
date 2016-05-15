import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Events } from '../lib/events.js';
import { Session } from 'meteor/session';
import { EventsIndex } from '../lib/events.js';

import './ownhome.html';

Template.ownHome.helpers({
	events() {
		return Events.find({createdBy: Meteor.user().username }, {sort: {start: 1}});
		
	}
});