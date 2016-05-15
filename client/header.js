import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Events } from '../lib/events.js';
import { EventsIndex } from '../lib/events.js';
import { Session } from 'meteor/session';

import './header.html';

Template.header.events({
	'click #not-loggedin'(e) {
		e.preventDefault();
		toastr.warning("Sign in to create event!");
	},
	'submit #search-form'(event) {
		event.preventDefault();
		const text = $(event.target).val().trim();
		Session.set("search-text", text);
		Router.go('/');
	},
	'click #return-home'() {
		$('input[name=srch-term]').val("");
		Session.set("search-text", "");
	},
	'keyup #srch-term': _.throttle(function(e) {
		const text = $(e.target).val().trim();
		Session.set("search-text", text);
		
	}, 200)
});