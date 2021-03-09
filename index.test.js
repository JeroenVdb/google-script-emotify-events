const rewire = require('rewire');

const app = rewire('./index.js');

init = app.__get__('init');
getFutureEventsUntilDays = app.__get__('getFutureEventsUntilDays');
emotify = app.__get__('emotify');
doesNotStartsWithEmoji = app.__get__('doesNotStartsWithEmoji');

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
var eventDoctor = createMockedEvent('Bij de dokter');
var eventDentist = createMockedEvent('Naar de tandarts');
var eventMil = createMockedEvent('Mil naar Dino World');
var eventMax = createMockedEvent('Max naar Dino World');
var eventMilToDoctor = createMockedEvent('Met Mil naar de dokter');

CalendarMock = {
	getName: function() {
		return "GmailDefaultCalendar"
	},
	getEvents: function(start, end) {
		return [eventFoo, eventTrain, eventRunning, eventGaming, eventFood, eventKapper, eventDoctor, eventDentist, eventMil, eventMax, eventMilToDoctor]
	}
};

CalendarAppMock = {
	getDefaultCalendar: function () {
		return CalendarMock;
	}
}

app.__set__('CalendarApp', CalendarAppMock);

describe('Emotify train events', function() {
	it('Should find 10 calendar items', function() {
		expect(getFutureEventsUntilDays(CalendarMock, 0).length).toBe(11);
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

	it('Should emotify doctor calendar items', function() {
		init();
		const events = CalendarMock.getEvents();
		expect(events[6].title).toBe('🩺 Bij de dokter');
	});

	it('Should emotify dentist calendar items', function() {
		init();
		const events = CalendarMock.getEvents();
		expect(events[7].title).toBe('🦷 Naar de tandarts');
	});

	it('Should emotify Mil calendar items', function() {
		init();
		const events = CalendarMock.getEvents();
		expect(events[8].title).toBe('👶 Mil naar Dino World');
	});

	it('Should emotify Max calendar items', function() {
		init();
		const events = CalendarMock.getEvents();
		expect(events[9].title).toBe('👶 Max naar Dino World');
	});

	it('Should handle double events Mil to the doctor, first match is used', function() {
		init();
		const events = CalendarMock.getEvents();
		expect(events[10].title).toBe('🩺 Met Mil naar de dokter');
	});
});


describe('doesNotStartsWithEmoji', function() {
	it('Should return false if the string starts with an emoji', function() {
		expect(doesNotStartsWithEmoji('😬 this string starts with an emoji')).toBe(false);
		expect(doesNotStartsWithEmoji('😬 this string 😬 has multiple emoji 😬')).toBe(false);
	});

	it('Should return true if the string does not start with an emoji', function() {
		expect(doesNotStartsWithEmoji('this string has an emoji at the end 😬')).toBe(true);
		expect(doesNotStartsWithEmoji('this string 😬 has an emoji in the middle')).toBe(true);
		expect(doesNotStartsWithEmoji('this string has an no emoji')).toBe(true);
	});
});
