import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Events } from '../lib/events.js';

import './event.html';

Template.event.helpers({
	startTime() {
		const startWrapper = moment(this.start).format("MMM D, h:mm a");
		return startWrapper;
	},
	endTime() {
		const endWrapper = moment(this.end).format("MMM D, h:mm a");
		return endWrapper;
	},
	hasImage() {
		if(this.src){
			return true;
		}
		return false;
	},
})