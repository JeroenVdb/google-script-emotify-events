const rewire = require('rewire');
const assert = require('assert');

const app = rewire('./index.js');

init = app.__get__('init');
getFutureEventsUntilDays = app.__get__('getFutureEventsUntilDays');
emotify = app.__get__('emotify');

var eventFoo = {
	title: 'Foo',
	getTitle: function () {
		return this.title;
	},
	setTitle: function (newTitle) {
		this.title = newTitle;
	}
};

var eventTrain = {
	title: 'Trein',
	getTitle: function () {
		return this.title;
	},
	setTitle: function (newTitle) {
		this.title = newTitle;
	}
};

CalendarMock = {
	getName: function() {
		return "GmailDefaultCalendar"
	},
	getEvents: function(calendar, days) {
		return [eventFoo, eventTrain, eventFoo]
	}
};

CalendarAppMock = {
	getDefaultCalendar: function () {
		return CalendarMock;
	}
}

app.__set__('CalendarApp', CalendarAppMock);

describe('Emotify train events', function() {
	it('Should find 3 calendar items', function() {
		assert.equal(getFutureEventsUntilDays(CalendarMock, 0).length, 3)
	});

	it('Should emotify train calendar items', function() {
		init();
		var events = CalendarMock.getEvents();
		assert.equal(events[0].title, 'Foo')
		assert.equal(events[1].title, '🚂 Trein')
		assert.equal(events[2].title, 'Foo')
	});
});
