import {RouterLinkStub, shallowMount} from '@vue/test-utils';
import {BotResult} from '/imports/api/bot-results/bot-results';
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

    BotResult.find.mockReturnValue(new Cursor(botResults));
    let wrapper = shallowMount(ViewBotResults, {stubs: {RouterLink: RouterLinkStub}});

    expect(wrapper.html()).toContain(botResults.date);
    expect(wrapper.html()).toContain(botResults.title);
    expect(wrapper.html()).toContain(botResults.score);
});

test('should indicate if there are no results', () => {
    BotResult.find.mockReturnValue(new Cursor());

    let wrapper = shallowMount(ViewBotResults, {stubs: {RouterLink: RouterLinkStub}});

    expect(wrapper.html()).toContain('No data available');
});
