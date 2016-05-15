import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Events } from '../lib/events.js';
import { Moment } from 'meteor/momentjs:moment';
import { Slingshot } from 'meteor/edgee:slingshot';


import './create.html';

Template.individual.onRendered(() => {
	//initialize calendar and clock
	$('.datepicker').datepicker({startDate: '3d', orientation: 'bottom auto'});
	$('.clockpicker').clockpicker();
	//initialize slingshot uploader

  //Script for changing file input form label
  var inputs = document.querySelectorAll( '.inputfile' );
  Array.prototype.forEach.call( inputs, function( input )
  {
  	var label	 = input.nextElementSibling,
  	labelVal = label.innerHTML;

  	input.addEventListener( 'change', function( e )
  	{
  		var fileName = '';
  		if( this.files && this.files.length > 1 )
  			fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
  		else
  			fileName = e.target.value.split( '\\' ).pop();

  		if( fileName )
  			label.querySelector( 'span' ).innerHTML = fileName;
  		else
  			label.innerHTML = labelVal;
  	});
  });
});

Template.individual.events({
	'change .inputfile'(event) {
		if(event.target.files.length > 1) {
			event.preventDefault();
			toastr.warning("Please select a single image");
		}
	},
	"submit form": function(event) {
		event.preventDefault();

		const title = $('input[name=title]').val();
		const date = $('input[name=date]').val();
		const startingTime = $('input[name=starting-time]').val();
		const endingTime = $('input[name=ending-time]').val();
		const location = $('input[name=location]').val();
		const description = $('input[name=description]').val();
		if(event.target[6].files[0]) {
			const imgName = event.target[6].files[0].name;
		}


		const startString = date + " " + startingTime;
		const start = moment(startString, "MM/DD/YYYY HH:mm");
		const endString = date + " " + endingTime;
		const end = moment(endString, "MM/DD/YYYY HH:mm");

		if(event.target[6].files.length > 1){
			toastr.error('Please select a single image');
			return;
		}
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
			return;
		}

		if(event.target[6].files[0]){
			const uploader = new Slingshot.Upload("myFileUploads");

			uploader.send(event.target[6].files[0], function (error, downloadUrl) {
				if (error) {
			    // Log service detailed response.
			    console.error('Error uploading', uploader.xhr.response);
			    console.error(error);
			  }
			  else {
			  	toastr.success('uploaded!');
			  	//Meteor.users.update(Meteor.userId(), {$push: {"profile.files": downloadUrl}});
			  }
			});
		}
		let cursor;
		if(event.target[6].files[0]){
			cursor = Events.insert({
				title: title,
				date: date,
				start: start.toDate(),
				end: end.toDate(),
				location: location,
				description: description,
				createdBy: Meteor.user().username,
				src: imgName
			});
		} else {
			cursor = Events.insert({
				title: title,
				date: date,
				start: start.toDate(),
				end: end.toDate(),
				location: location,
				description: description,
				createdBy: Meteor.user().username,
			});
		}
		
		toastr.success('Event successfully added!');
		Router.go('/details/' + cursor);
	}
});