const rewire = require('rewire');
const assert = require('assert');

const app = rewire('./index.js');

init = app.__get__('init');
getFutureEventsUntilDays = app.__get__('getFutureEventsUntilDays');
emotify = app.__get__('emotify');

function createMockedEvent(name) {
	return {
		title: name,
		getTitle: function () {
			return this.title;
		},
		setTitle: function (newTitle) {
			this.title = newTitle;
		}
	}
}

var eventFoo = createMockedEvent('Foo');
var eventTrain = createMockedEvent('Trein');
var eventRunning = createMockedEvent('Lopen');
var eventGaming = createMockedEvent('Spelletjesavond');

CalendarMock = {
	getName: function() {
		return "GmailDefaultCalendar"
	},
	getEvents: function(start, end) {
		return [eventFoo, eventTrain, eventRunning, eventGaming]
	}
};

CalendarAppMock = {
	getDefaultCalendar: function () {
		return CalendarMock;
	}
}

app.__set__('CalendarApp', CalendarAppMock);

describe('Emotify train events', function() {
	it('Should find 4 calendar items', function() {
		assert.equal(getFutureEventsUntilDays(CalendarMock, 0).length, 4)
	});

	it('Should emotify train calendar items', function() {
		init();
		var events = CalendarMock.getEvents();
		assert.equal(events[1].title, '🚂 Trein')
	});

	it('Should emotify lopen calendar items', function() {
		init();
		var events = CalendarMock.getEvents();
		assert.equal(events[2].title, '🏃 Lopen')
	});

	it('Should emotify spelletjesvaond calendar items', function() {
		init();
		var events = CalendarMock.getEvents();
		assert.equal(events[3].title, '🎲 Spelletjesavond')
	});
});
