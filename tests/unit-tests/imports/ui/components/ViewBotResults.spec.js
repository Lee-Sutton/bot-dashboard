import {RouterLinkStub, shallowMount} from '@vue/test-utils';
import {BotResults} from '/imports/api/bot-results/bot-results';
import '/imports/startup/client/vue-plugins';

import ViewBotResults from '/imports/ui/components/view-bot-results/ViewBotResults';
import {Cursor} from '/tests/utils.js';

beforeEach(() => jest.resetAllMocks());

afterEach(() => jest.resetAllMocks());

test('should list the bot results', () => {
    let botResults = {
        date: 'Jan 1, 2020',
        title: 'testing',
        score: 100
    };
    let mockResults = new Cursor(botResults);
    BotResults.find.mockReturnValue(mockResults);
    let results = BotResults.find();
    console.log(results);
    console.log(results instanceof Cursor);
    let wrapper = shallowMount(ViewBotResults, {stubs: {RouterLink: RouterLinkStub}});

    expect(wrapper.html()).toContain(botResults.date);
    expect(wrapper.html()).toContain(botResults.title);
    expect(wrapper.html()).toContain(botResults.score);
});

test('should indicate if there are no results', () => {
    BotResults.find.mockReturnValue(new Cursor());

    let wrapper = shallowMount(ViewBotResults, {stubs: {RouterLink: RouterLinkStub}});

    expect(wrapper.html()).toContain('No data available');
});
