const rewire = require('rewire');

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
var eventFood = createMockedEvent('Eten bij brasserie Julie');
var eventKapper = createMockedEvent('Kapper');

CalendarMock = {
	getName: function() {
		return "GmailDefaultCalendar"
	},
	getEvents: function(start, end) {
		return [eventFoo, eventTrain, eventRunning, eventGaming, eventFood, eventKapper]
	}
};

CalendarAppMock = {
	getDefaultCalendar: function () {
		return CalendarMock;
	}
}

app.__set__('CalendarApp', CalendarAppMock);

describe('Emotify train events', function() {
	it('Should find 6 calendar items', function() {
		expect(getFutureEventsUntilDays(CalendarMock, 0).length).toBe(6);
	});

	it('Should emotify train calendar items', function() {
		init();
		const events = CalendarMock.getEvents();
		expect(events[1].title).toBe('🚂 Trein');
	});

	it('Should emotify lopen calendar items', function() {
		init();
		const events = CalendarMock.getEvents();
		expect(events[2].title).toBe('🏃 Lopen');
	});

	it('Should emotify spelletjesvaond calendar items', function() {
		init();
		const events = CalendarMock.getEvents();
		expect(events[3].title).toBe('🎲 Spelletjesavond');
	});

	it('Should emotify food calendar items', function() {
		init();
		const events = CalendarMock.getEvents();
		expect(events[4].title).toBe('🍟 Eten bij brasserie Julie');
	});

	it('Should emotify food calendar items', function() {
		init();
		const events = CalendarMock.getEvents();
		expect(events[5].title).toBe('💇 Kapper');
	});
});
