import {RouterLinkStub, shallowMount} from '@vue/test-utils';
// import {Meteor} from 'meteor/meteor';
import {BotResults} from '/imports/api/bot-results/bot-results';
import '/imports/startup/client/vue-plugins';

// TODO rename BotResults component to ViewBotResults
import ViewBotResults from '/imports/ui/components/view-bot-results/ViewBotResults';


beforeEach(() => jest.resetAllMocks());

afterEach(() => jest.resetAllMocks());

// test('should subscribe to botResults', () => {
//     let spy = jest.spyOn(Meteor, 'subscribe');
//     shallowMount(ViewBotResults, {stubs: {RouterLink: RouterLinkStub}});
//     expect(spy.mock.calls[0][0]).toContain('botResults');
// });

test('should list the bot results', () => {
    let botResults = {
        date: 'Jan 1, 2020',
        title: 'testing',
        score: 100
    };
    BotResults.find.mockReturnValue([botResults]);

    let wrapper = shallowMount(ViewBotResults, {stubs: {RouterLink: RouterLinkStub}});

    expect(wrapper.html()).toContain(botResults.date);
    expect(wrapper.html()).toContain(botResults.title);
    expect(wrapper.html()).toContain(botResults.score);
});
