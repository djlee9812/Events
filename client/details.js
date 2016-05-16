import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Events } from '../lib/events.js';

import './event.html';

Template.details.onCreated(() => {
	Meteor.subscribe('userData');
	const tmpl = Template.instance();
	tmpl.interest = new ReactiveVar(Array.isArray(Meteor.user().interested) && Meteor.user().interested.indexOf(Template.instance().data._id) > -1 );
	tmpl.going = new ReactiveVar(Array.isArray(Meteor.user().going) && Meteor.user().going.indexOf(Template.instance().data._id) > -1 );
});

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
	},
	interestBtn() {
		if(Template.instance().interest.get()){
			return "selected-btn btn-primary";
		} else {
			return "unselected";
		}
	},
	goingBtn() {
		if(Template.instance().going.get()){
			return "selected-btn btn-primary";
		} else {
			return "unselected";
		}
	},
});

Template.details.events({
	"click #going": function(event, tmpl) {
		$('#going').blur();
		Meteor.call('toggleGoing', this._id, function(err, result) {
			if(!err){
				tmpl.going.set(result);
				tmpl.interest.set(false);
			}
		});

	},
	"click #interested": function(event, tmpl){
		$('#interested').blur();
		Meteor.call('toggleInterest', this._id, function(err, result){
			if(!err){
				tmpl.interest.set(result);
				tmpl.going.set(false);
			}
		});
	},
	'submit form': function(event) {
		event.preventDefault();
		const formVal = $('input[name=delete-title]').val();
		const tmplTitle = this.title;
		if(Meteor.user().username != this.createdBy){
			toastr.error('You do not have permission to remove this event.');
			return;
		}

		if(formVal == tmplTitle){
			$('#myModal').modal('hide');
			$('body').removeClass('modal-open');
			$('.modal-backdrop').remove();

			Meteor.call('removeEvent', this._id, Meteor.user().username, function(err, result){
				if(err){
					toastr.js('Error');
					console.log(err);
				} else {
					toastr.success("Event deleted");
				}
			});
		} else {
			toastr.error("The title you entered does not match the event title.");
			return;
		}
		Router.go('/');
	}
})