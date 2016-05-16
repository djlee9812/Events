import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Events } from '../lib/events.js';
import { Session } from 'meteor/session';
import { EventsIndex } from '../lib/events.js';
import { ReactiveVar } from 'meteor/reactive-var'

import './home.html';

Template.home.onCreated(() => {
	const tmpl = Template.instance();
	tmpl.eventLimit = new ReactiveVar(6);
});

Template.home.onRendered(() => {
	const tmpl = Template.instance();
	$(window).scroll(function(event) {
		if ($(window).scrollTop() + $(window).height() >= $(document).height() - 300){	
			const current = tmpl.eventLimit.get();
			tmpl.eventLimit.set(current + 6);
		}
	});
})


Template.home.helpers({
	events: function() {
		const lim = Template.instance().eventLimit.get();

		if(Session.get("search-text")){
			const text = Session.get("search-text");
			return EventsIndex.search(text).mongoCursor;
		} else {
			return Events.find({}, {sort: {start: 1}, 
				limit: lim
			});
		}
	},
});
