
import {routerlinkstub, mount} from '@vue/test-utils';
import {meteor} from 'meteor/meteor';
import {bot} from '/imports/api/bots/bots';
import '/imports/startup/client/vue-plugins';

import botlist from '/imports/ui/components/bot-list/botlist.vue';

describe('#botlist component spec', () => {
    let bot = {
        subreddit: 'testing',
        name: 'dummy name',
        keyword: 'dummy key',
        minimumscore: 100,
        _id: 'dummyid',
        remove: jest.fn(),
        results() {
            return {
              count: jest.fn().mockreturnvalue(10)
            }
        }
    };

    beforeeach(() => {
        jest.resetallmocks();
        bot.find.mockreturnvalue([bot]);
    });

    it('it should welcome the user if they are not logged in', () => {
        meteor.user.mockreturnvalue(false);
        let wrapper = mount(botlist, {stubs: {routerlink: routerlinkstub}});
        expect(wrapper.html()).tocontain('welcome')
    });

    it('should subscribe to bots.all and botresultscount', function () {
        mount(botlist, {stubs: {routerlink: routerlinkstub}});
        expect(meteor.mocksubscribe).tobecalledwith('bots.all');
        expect(meteor.mocksubscribe).tobecalledwith('botresultcount');
    });

    it('should show the list of bots if the user is logged in', function () {
        meteor.user.mockreturnvalue(true);
        let wrapper = mount(botlist, {stubs: {routerlink: routerlinkstub}}),
            routerstub = wrapper.findall(routerlinkstub);

        expect(wrapper.html()).tocontain(bot.subreddit);
        expect(wrapper.html()).tocontain(bot.keyword);
        expect(wrapper.html()).tocontain(bot.minimumscore);
        expect(wrapper.html()).tocontain(bot.name);
        expect(wrapper.html()).tocontain(bot.results().count());
        expect(routerstub.at(0).props().to).tobe('/add');
        expect(routerstub.at(1).props().to).toequal({name: 'results', params: {id: bot._id}});
        expect(routerstub.at(2).props().to).toequal({name: 'add', params: {bot}});

    });
});
