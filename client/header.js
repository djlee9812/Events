import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './header.html';

Template.header.events({
	'click #not-loggedin'(e) {
		e.preventDefault();
		toastr.warning("Sign in to create event!");
	},
	'click #your-events'(e) {
		e.preventDefault();
		Router.go('/');
	}
})