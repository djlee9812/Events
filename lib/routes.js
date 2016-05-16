import { Meteor } from 'meteor/meteor';
import { Events } from './events.js'

Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
});

AccountsTemplates.configure({
	defaultLayout: 'layout',
	enablePasswordChange: true,
	showForgotPasswordLink: true,
	onLogoutHook: function() {
		Router.go('/');
	}

});

AccountsTemplates.configureRoute('signIn', {
	name: 'login',
	path: '/signin',
	template: 'login',
	redirect: '/'
});

AccountsTemplates.configureRoute('signUp', {
	name: 'signup',
	path: '/signup',
	template: 'login',
	redirect: '/'
});

AccountsTemplates.configureRoute('forgotPwd', {
	name: 'forgot',
	path: '/forgot-password',
	template: 'login',
	redirect: '/'
});

Router.route('/', function() {
	this.render('home');
}, {
	name: 'home'
});

Router.route('/own', function() {
	this.render('ownHome');
}, {
	name: 'ownHome'
});

Router.route('/going', function() {
	this.subscribe('userData').wait();
	if(this.ready()) {
		this.render('going');
	} else {
		this.render('loading');
	}
});

Router.route('/interested', function() {
	this.subscribe('userData').wait();
	if(this.ready()) {
		this.render('interested');
	} else {
		this.render('loading');
	}
});

Router.route('/create', function() {
	this.render('create');
	this.render('options', {to: 'createTemplate'});
});

Router.route('/details/:_id', function() {
	this.subscribe('userData').wait();
	if(this.ready()){
		this.render('details', {
			data: function() {
				return Events.findOne({_id: this.params._id});
			},
		});
	} else {
		this.render('loading');
	}
}, {
	name: 'details'
});

Router.route('/create/individual', function() {
	this.render('create');
	this.render('individual', {to: 'createTemplate'});
});

Router.route('create/guide', function() {
	this.render('create');
	this.render('guide', {to: 'createTemplate'});
}, {
	name: 'guide'
});