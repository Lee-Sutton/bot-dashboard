import {RouterLinkStub, shallowMount} from '@vue/test-utils';
// import {Meteor} from 'meteor/meteor';
import {BotResults} from '/imports/api/bot-results/bot-results';
import '/imports/startup/client/vue-plugins';

// TODO rename BotResults component to ViewBotResults
import ViewBotResults from '/imports/ui/components/bot-results/ViewBotResults';


describe('#BotResult component spec', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    test('it should list the bot results', () => {
        let botResults = {
            subreddit: 'testing',
            name: 'dummy name',
            keyword: 'dummy key',
            minimumScore: 100,
            _id: 'dummyId',
        };
        BotResults.find.mockReturnValue([botResults]);

        let wrapper = shallowMount(ViewBotResults, {stubs: {RouterLink: RouterLinkStub}});

        expect(wrapper.html()).toContain('welcome')
    });
});
