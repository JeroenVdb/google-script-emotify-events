function init() {
	const calendar = CalendarApp.getDefaultCalendar();
	const events = getFutureEventsUntilDays(calendar, 100);

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

	if (event.getTitle().indexOf('Trein') > -1 && doesNotStartsWithEmoji(event.getTitle())) {
		console.log('Add 🚂 to ' + event.getTitle());
		event.setTitle('🚂 ' + event.getTitle());
	}

	if (event.getTitle().indexOf('Lopen') > -1 && doesNotStartsWithEmoji(event.getTitle())) {
		console.log('Add 🏃 to ' + event.getTitle());
		event.setTitle('🏃 ' + event.getTitle());
	}

	if (event.getTitle().indexOf('Spelletjes') > -1 && doesNotStartsWithEmoji(event.getTitle())) {
		console.log('Add 🎲 to ' + event.getTitle());
		event.setTitle('🎲 ' + event.getTitle());
	}

	if (event.getTitle().indexOf('Eten') > -1 && doesNotStartsWithEmoji(event.getTitle())) {
		console.log('Add 🍟 to ' + event.getTitle());
		event.setTitle('🍟 ' + event.getTitle());
	}

	if (event.getTitle().indexOf('Kapper') > -1 && doesNotStartsWithEmoji(event.getTitle())) {
		console.log('Add 💇 to ' + event.getTitle());
		event.setTitle('💇 ' + event.getTitle());
	}

	if (event.getTitle().indexOf('dokter') > -1 && doesNotStartsWithEmoji(event.getTitle())) {
		console.log('Add 🩺 to ' + event.getTitle());
		event.setTitle('🩺 ' + event.getTitle());
	}

	if (event.getTitle().indexOf('Mil') > -1 && doesNotStartsWithEmoji(event.getTitle())) {
		console.log('Add 👶 to ' + event.getTitle());
		event.setTitle('👶 ' + event.getTitle());
	}

	if (event.getTitle().indexOf('Max') > -1 && doesNotStartsWithEmoji(event.getTitle())) {
		console.log('Add 👶 to ' + event.getTitle());
		event.setTitle('👶 ' + event.getTitle());
	}
}

function doesNotStartsWithEmoji(str) {
	return Boolean(
		str.charAt(0).match(/[A-Z]/i)
	)
}

Date.prototype.addDays = function(days) {
	var date = new Date(this.valueOf());
	date.setDate(date.getDate() + days);
	return date;
}
