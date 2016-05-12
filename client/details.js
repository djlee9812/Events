import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Events } from '../lib/events.js';

import './event.html';

Template.details.onRendered(() => {
	$('#myModal').on('shown.bs.modal', function () {
		$('#myInput').focus()
	});
});

Template.details.helpers({
	startTime() {
		const startWrapper = moment(this.start).format("MMM D, h:mm a");
		return startWrapper;
	},
	endTime() {
		const endWrapper = moment(this.end).format("MMM D, h:mm a");
		return endWrapper;
	},
	ownEvent() {
		return Meteor.user().username == this.createdBy;
	},
	hasImage() {
		if(this.src){
			return true;
		}
		return false;
	}
});

Template.details.events({
	'submit form'(event) {
		event.preventDefault();
		const formVal = $('input[name=delete-title]').val();
		const tmplTitle = this.title;
		if(Meteor.user().username != this.createdBy){
			toastr.error('You do not have permission to remove this event.');
			return;
		}

		if(formVal == tmplTitle){
			$('#myModal').modal('hide');
			Events.remove(this._id);
			toastr.success("Event deleted");
			Router.go('/');
		} else {
			toastr.error("The title you entered does not match the event title.");
		}


	}
})