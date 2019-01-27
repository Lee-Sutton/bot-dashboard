
import {RouterLinkStub, mount} from '@vue/test-utils';
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
        results() {
            return {
              count: jest.fn().mockReturnValue(10)
            }
        }
    };

    beforeEach(() => {
        jest.resetAllMocks();
        Bot.find.mockReturnValue([bot]);
    });

    it('it should welcome the user if they are not logged in', () => {
        Meteor.user.mockReturnValue(false);
        let wrapper = mount(BotList, {stubs: {RouterLink: RouterLinkStub}});
        expect(wrapper.html()).toContain('Welcome')
    });

    it('should subscribe to bots.all and botResultsCount', function () {
        mount(BotList, {stubs: {RouterLink: RouterLinkStub}});
        expect(Meteor.mockSubscribe).toBeCalledWith('bots.all');
        expect(Meteor.mockSubscribe).toBeCalledWith('botResultCount');
    });

    it('should show the list of bots if the user is logged in', function () {
        Meteor.user.mockReturnValue(true);
        let wrapper = mount(BotList, {stubs: {RouterLink: RouterLinkStub}}),
            routerStub = wrapper.findAll(RouterLinkStub);

        expect(wrapper.html()).toContain(bot.subreddit);
        expect(wrapper.html()).toContain(bot.keyword);
        expect(wrapper.html()).toContain(bot.minimumScore);
        expect(wrapper.html()).toContain(bot.name);
        expect(wrapper.html()).toContain(bot.results().count());
        expect(routerStub.at(0).props().to).toBe('/add');
        expect(routerStub.at(1).props().to).toEqual({name: 'results', params: {id: bot._id}});
        expect(routerStub.at(2).props().to).toEqual({name: 'add', params: {bot}});
    });
    it('should allow users to delete bots', function () {
        Meteor.user.mockReturnValue(true);
        let wrapper = mount(BotList, {stubs: {RouterLink: RouterLinkStub}});

        wrapper.find('[data-cy=delete-bot0').trigger('click');

    });
});
