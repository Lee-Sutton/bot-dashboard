
import {mount, shallowMount} from '@vue/test-utils';
import {Meteor} from 'meteor/meteor';
import {Bots} from '/imports/api/bots/bots';

import BotList from '/imports/ui/components/bot-list/BotList.vue';

describe('#BotList component spec', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });
    it('it should welcome the user if they are not logged in', () => {
        Meteor.user.mockReturnValueOnce(undefined);
        let wrapper = shallowMount(BotList);
        expect(wrapper.html()).toContain('welcome')
    });

    it('should show the list of bots if the user is logged in', function () {
        Meteor.user.mockReturnValueOnce(true);
        let bot = {
            subreddit: 'testing'
        };
        Bots.find.mockReturnValue([bot]);

        let wrapper = mount(BotList);
        expect(wrapper.html()).toContain(bot.subreddit);
    });
});
