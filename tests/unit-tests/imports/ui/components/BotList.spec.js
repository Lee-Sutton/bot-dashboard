
import {RouterLinkStub, shallowMount} from '@vue/test-utils';
import {Meteor} from 'meteor/meteor';
import {Bot} from '/imports/api/bots/bots';
import '/imports/startup/client/vue-plugins';

import BotList from '/imports/ui/components/bot-list/BotList.vue';

describe('#BotList component spec', () => {
    let bot = {
        subreddit: 'testing',
        name: 'dummy name',
        keyword: 'dummy key',
        minimumScore: 100,
        _id: 'dummyId',
        remove: jest.fn(),
    };

    beforeEach(() => {
        jest.resetAllMocks();
        // The user is logged in
        Meteor.user.mockReturnValueOnce(true);
        Bot.find.mockReturnValue([bot]);

    });

    it('it should welcome the user if they are not logged in', () => {
        Meteor.user.mockReturnValueOnce(undefined);

        let wrapper = shallowMount(BotList, {stubs: {RouterLink: RouterLinkStub}});

        expect(wrapper.html()).toContain('welcome')
    });

    it('should show the list of bots if the user is logged in', function () {
        let wrapper = shallowMount(BotList, {stubs: {RouterLink: RouterLinkStub}}),
            routerStub = wrapper.findAll(RouterLinkStub);

        expect(wrapper.html()).toContain(bot.subreddit);
        expect(wrapper.html()).toContain(bot.keyword);
        expect(wrapper.html()).toContain(bot.minimumScore);
        expect(wrapper.html()).toContain(bot.name);
        expect(routerStub.at(0).props().to).toBe('/add');
        expect(routerStub.at(1).props().to).toEqual({name: 'results', params: {id: bot._id}});

    });

    it('should allow the user to delete bots', function () {
        let wrapper = shallowMount(BotList, {stubs: {RouterLink: RouterLinkStub}});
        wrapper.find('#delete-bot-1').trigger('click');

    });
});
