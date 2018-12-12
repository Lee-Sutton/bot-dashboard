
import {routerlinkstub, mount} from '@vue/test-utils';
import {Meteor} from 'meteor/meteor';
import {Bot} from '/imports/api/bots/bots';
import '/imports/startup/client/vue-plugins';
import td from 'testdouble';
import {expect} from 'chai';

import {insertBot} from '/imports/api/bots/bots';

describe.only('#botlist component spec', () => {
    if (Meteor.isServer) {
        afterEach(function () {
            Bot.remove({});
        })
    }

    if (Meteor.isClient) {
        const botlist = require('/imports/ui/components/bot-list/botlist.vue');
        let meteorUser,
            botId,
            bot = {
                subreddit: 'testing',
                name: 'dummy name',
                keyword: 'dummy key',
                minimumscore: 100,
                _id: 'dummyid',
                remove: jest.fn(),
            };

        beforeEach(function () {
            meteorUser = td.replace(Meteor, 'user');
            td.when(meteorUser()).thenReturn({_id: 'dummyUser'});
            botId = insertBot.call(bot)
        });

        afterEach(function () {
            td.reset();
        });

        it('it should welcome the user if they are not logged in', () => {
            td.when(meteorUser()).thenReturn(null);
            let wrapper = mount(botlist, {stubs: {routerlink: routerlinkstub}});
            expect(wrapper.html()).to.contain('welcome')
        });

        it('should show the list of bots if the user is logged in', function () {
            let wrapper = mount(botlist, {stubs: {routerlink: routerlinkstub}});
            expect(wrapper.html()).to.contain(bot.subreddit);
            expect(wrapper.html()).to.contain(bot.keyword);
            expect(wrapper.html()).to.contain(bot.minimumscore);
            expect(wrapper.html()).to.contain(bot.name);
            expect(wrapper.html()).to.contain(bot.results().count());
        });
    }
});
