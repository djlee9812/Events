import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Events } from '../lib/events.js';
import { Moment } from 'meteor/momentjs:moment';

import './create.html';

Template.individual.onRendered(() => {
	$('.datepicker').datepicker({startDate: '3d', orientation: 'bottom auto'});
	$('.clockpicker').clockpicker();
});

Template.individual.events({
	"submit form"(event) {
		event.preventDefault();

		const title = $('input[name=title]').val();
		const date = $('input[name=date]').val();
		const startingTime = $('input[name=starting-time]').val();
		const endingTime = $('input[name=ending-time]').val();
		const location = $('input[name=location]').val();
		const description = $('input[name=description]').val();

		const startString = date + " " + startingTime;
		const start = moment(startString, "MM/DD/YYYY HH:mm");
		const endString = date + " " + endingTime;
		const end = moment(endString, "MM/DD/YYYY HH:mm");

		if(!title){
			toastr.error('Please enter an event title.');
			return;
		}
		if(!date){
			toastr.error('Please enter the date of your event.');
			return;
		}
		if(!startingTime){
			toastr.error('Please specify the beginning time of your event');
			return;
		}
		if(!endingTime){
			toastr.error('Please specify the ending time of your event');
			return;
		}
		if(!location){
			toastr.error('Please specify the location of your event');
			return;
		}
		if(!start.toDate() || !end.toDate()){
			toastr.error('Please check to make sure the time is entered correctly.');
		}

		

		const cursor = Events.insert({
			title: title,
			date: date,
			start: start.toDate(),
			end: end.toDate(),
			location: location,
			description: description,
			createdBy: Meteor.user().username
		});
		toastr.success('Event successfully added!');
		Router.go('/details/' + cursor);
	}
});