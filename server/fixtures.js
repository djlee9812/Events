import { Events } from '../lib/events.js';

if(!Events.findOne()){
	Events.insert({
		title: 'Opening Ceremony',
		start: new Date("May 31, 2016 11:00:00"),
		end: new Date("May 31, 2016 14:00:00"),
		createdBy: 'Admin',
		src: 'ribbon.jpg',
		location: 'Cypress, CA',
		description: 'Opening ceremony of the Events App! Come join us at Cypress, CA to watch the unveiling of this application to the public. All are welcome to join this public event, no invitation required.'
	});
	Events.insert({
		title: 'Registration',
		start: new Date("May 28, 2016 07:00:00"),
		end: new Date("May 28, 2016 16:00:00"),
		createdBy: 'Admin',
		src: 'register.jpg',
		location: 'Anaheim, CA',
	});
}