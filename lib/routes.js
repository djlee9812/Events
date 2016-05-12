import { Meteor } from 'meteor/meteor';
import { Events } from './events.js'

Router.configure({
	layoutTemplate: 'layout'
});

Router.route('/', function() {
	this.render('home');
}, {
	name: 'home'
});

Router.route('/create', function() {
	this.render('create');
	this.render('options', {to: 'createTemplate'});
});

Router.route('/details/:_id', function() {
	this.render('details', {
		data: function() {
			return Events.findOne({_id: this.params._id});
		},
	})
}, {
	name: 'details'
});

Router.route('/create/individual', function() {
	this.render('create');
	this.render('individual', {to: 'createTemplate'});
});

Router.route('create/guide', function() {
	this.render('guide', {to: 'createTemplate'});
}, {
	name: 'guide'
});