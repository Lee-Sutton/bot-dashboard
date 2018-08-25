
import {mount} from '@vue/test-utils';
import {Meteor} from 'meteor/meteor';

import AddBot from '/imports/ui/components/add-bot/AddBot';

describe('#AddBot component spec', () => {
    let wrapper,
        botName;

    beforeEach(() => {
        jest.resetAllMocks();
        botName = 'testing';
        wrapper = mount(AddBot);

        wrapper.vm.$router = {
            push: jest.fn()
        };

        // The user fills in the inputs
        wrapper.find('#bot-name').setValue(botName);
    });

    it('should render', () => {
        expect(wrapper.html()).toContain('Add a bot');
    });

    it('should store the form inputs as a bot', () => {
        wrapper.find('form').trigger('submit');

        expect(Meteor.call.mock.calls.length).toBe(1);
        expect(Meteor.call.mock.calls[0][0]).toContain('bots.insert');

        let inputBot = Meteor.call.mock.calls[0][1];
        expect(inputBot.name).toBe(botName);
    });

    it('should redirect the user back to the home page', function () {
        wrapper.find('form').trigger('submit');
        let callback = Meteor.call.mock.calls[0][2];
        callback();
        expect(wrapper.vm.$router.push.mock.calls[0][0]).toContain('/');
    });
});
