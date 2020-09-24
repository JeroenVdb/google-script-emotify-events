function init() {
	const calendar = CalendarApp.getDefaultCalendar();
	const events = getFutureEventsUntilDays(calendar, 50);

	events.forEach(emotify);
}

function getFutureEventsUntilDays(calendar, days) {
	const startDate = new Date();
	const endDate = startDate.addDays(days);
	const events = calendar.getEvents(startDate, endDate);

	console.log('Found ' + events.length + ' events from ' + startDate + ' to ' + endDate);

	return events;
}

function emotify(event) {
	console.log('emotify event with name: ' + event.getTitle());

	if (event.getTitle().indexOf('Trein') === 0) {
		console.log('Add 🚂 to ' + event.getTitle());
		event.setTitle('🚂 ' + event.getTitle());
	}

	if (event.getTitle().indexOf('Lopen') === 0) {
		console.log('Add 🏃 to ' + event.getTitle());
		event.setTitle('🏃 ' + event.getTitle());
	}

	if (event.getTitle().indexOf('Spelletjes') === 0) {
		console.log('Add 🎲 to ' + event.getTitle());
		event.setTitle('🎲 ' + event.getTitle());
	}
}

Date.prototype.addDays = function(days) {
	var date = new Date(this.valueOf());
	date.setDate(date.getDate() + days);
	return date;
}
