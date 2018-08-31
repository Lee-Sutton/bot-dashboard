
import {shallowMount} from '@vue/test-utils';
import {Meteor} from 'meteor/meteor';

import BotList from '/imports/ui/components/bot-list/BotList.vue';

describe('#BotList component spec', () => {
    let wrapper,
        botName;

    beforeEach(() => {
        jest.resetAllMocks();
        botName = 'testing';
        wrapper = shallowMount(BotList);

        wrapper.vm.$router = {
            push: jest.fn()
        };
        wrapper.vm.$notify = jest.fn();
    });

    it('it should welcome the user if they are not logged in', () => {
        Meteor.user.mockReturnValue(undefined);
        expect(wrapper.html()).toContain('welcome')
    });

    // it('should store the form inputs as a bot', () => {
    //     wrapper.find('form').trigger('submit');
    //
    //     expect(Meteor.call.mock.calls.length).toBe(1);
    //     expect(Meteor.call.mock.calls[0][0]).toContain('bots.insert');
    //
    //     let inputBot = Meteor.call.mock.calls[0][1];
    //     expect(inputBot.name).toBe(botName);
    // });
    //
    // it('should redirect the user back to the home page', () => {
    //     wrapper.find('form').trigger('submit');
    //     let callback = Meteor.call.mock.calls[0][2];
    //     callback();
    //     expect(wrapper.vm.$router.push.mock.calls[0][0]).toContain('/');
    // });
    //
    // it('should notify the user if an error occured', () => {
    //     wrapper.find('form').trigger('submit');
    //     let callback = Meteor.call.mock.calls[0][2],
    //         error = {};
    //
    //     callback(error);
    //     expect(wrapper.vm.$notify.mock.calls).toHaveLength(1);
    // });
});
