import {mount} from '@vue/test-utils';
import toBeType from "jest-tobetype";
import AddBot from '/imports/ui/components/add-bot/AddBot';
import {insertBot} from '/imports/api/bots/bots';

expect.extend({toBeType});

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
        wrapper.vm.$notify = jest.fn();

        // The user fills in the inputs
        wrapper.find('#bot-name').setValue(botName);
    });

    it('should render', () => {
        expect(wrapper.html()).toContain('Add a bot');
    });

    it('should store the form inputs as a bot', () => {
        wrapper.find('form').trigger('submit');

        expect(insertBot.call.mock.calls.length).to.be(1);

        let insertedBot, callback;
        [insertedBot, callback] = insertBot.call.mock.calls[0];

        expect(typeof insertedBot.name).toBe('string');
        expect(typeof insertedBot.subreddit).toBe('string');
        expect(typeof insertedBot.keyword).toBe('string');
        expect(typeof insertedBot.description).toBe('string');
        expect(typeof insertedBot.minimumScore).toBe('number');
    });

    it('should redirect the user back to the home page', () => {
        wrapper.find('form').trigger('submit');

        expect(insertBot.call.mock.calls.length).to.be(1);

        let insertedBot, callback;
        [insertedBot, callback] = insertBot.call.mock.calls[0];

        callback();
        expect(wrapper.vm.$router.push.mock.calls[0][0]).toContain('/');
    });

    it('should notify the user if an error occured', () => {
        wrapper.find('form').trigger('submit');

        expect(insertBot.call.mock.calls.length).to.be(1);

        let insertedBot,
            callback,
            error = {};

        [insertedBot, callback] = insertBot.call.mock.calls[0];

        callback(error);
        expect(wrapper.vm.$notify.mock.calls).toHaveLength(1);
    });
});
