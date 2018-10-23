import {shallowMount} from '@vue/test-utils';
import toBeType from "jest-tobetype";
import AddBot from '/imports/ui/components/add-bot/AddBot';
import {insertBot, updateBot} from '/imports/api/bots/bots';
import flushPromises from 'flush-promises'
import _ from 'lodash';

expect.extend({toBeType});

const dummyBot = {
    _id: 'dummyBot',
    name: 'test',
    keyword: 'testKeyword',
    minimumScore: 100,
    subreddit: 'hiphopheads',
};

describe('#AddBot component spec', () => {
    let wrapper;

    describe('New Bot Creation', () => {
        beforeEach(() => {
            jest.resetAllMocks();

            dummyBot.name = 'testing';
            wrapper = shallowMount(AddBot, {sync: false});

            wrapper.vm.$router = {
                push: jest.fn()
            };
            wrapper.vm.$notify = jest.fn();

            // The user fills in the inputs
            wrapper.find('#name').setValue(dummyBot.name);
            wrapper.find('#keyword').setValue(dummyBot.keyword);
            wrapper.find('#minimumScore').setValue(dummyBot.minimumScore);
            wrapper.vm.subreddit = dummyBot.subreddit;
        });

        it('should render', () => {
            expect(wrapper.html()).toContain('Name');
        });

        it('should store the form inputs as a bot', async () => {
            wrapper.find('form').trigger('submit');

            await flushPromises();

            expect(insertBot.call).toBeCalled();

            let insertedBot, callback;
            [insertedBot, callback] = insertBot.call.mock.calls[0];

            expect(typeof insertedBot.name).toBe('string');
            expect(typeof insertedBot.subreddit).toBe('string');
            expect(typeof insertedBot.keyword).toBe('string');
            expect(typeof insertedBot.description).toBe('string');
            expect(typeof insertedBot.minimumScore).toBe('number');
        });

        it('should redirect the user back to the home page', async () => {
            wrapper.find('form').trigger('submit');

            await flushPromises();

            expect(insertBot.call).toBeCalled();

            let insertedBot, callback;
            [insertedBot, callback] = insertBot.call.mock.calls[0];

            callback();
            expect(wrapper.vm.$router.push.mock.calls[0][0]).toContain('/');
        });

        it('should notify the user if an error occurred', async () => {
            wrapper.find('form').trigger('submit');

            await flushPromises();
            expect(insertBot.call).toBeCalled();

            let insertedBot,
                callback,
                error = {};

            [insertedBot, callback] = insertBot.call.mock.calls[0];

            callback(error);
            expect(wrapper.vm.$notify.mock.calls).toHaveLength(1);
        });
    });

    describe('validation', () => {
        beforeEach(() => {
            jest.resetAllMocks();
            wrapper = shallowMount(AddBot, {
                sync: false,
            });

            wrapper.vm.$router = {
                push: jest.fn()
            };
            wrapper.vm.$notify = jest.fn();
        });

        it('should validate user input', async () => {
            wrapper.find('form').trigger('submit');
            await flushPromises();

            expect(wrapper.find('#name-group').html()).toContain('is required');
        });
    });

    describe('Updating bots', () => {
        beforeEach(() => {
            jest.resetAllMocks();
            wrapper = shallowMount(AddBot, {
                sync: false,
                propsData: {bot: dummyBot}
            });

            wrapper.vm.$router = {
                push: jest.fn()
            };
            wrapper.vm.$notify = jest.fn();
        });

        it('should pre-populate the fields if a bot is supplied', () => {
            let fields = _.pick(dummyBot, ['name', 'subreddit', 'minimumScore', 'description'])
            for (let key in fields) {
                expect(wrapper.vm[key]).toBe(dummyBot[key]);
            }
        });
        it('should update the supplied bot', async () => {
            wrapper.find('form').trigger('submit');

            await flushPromises();

            expect(updateBot.call).toBeCalled();

            let updatedBot = updateBot.call.mock.calls[0][0];

            expect(updatedBot._id).toBeDefined();

            expect(wrapper.vm.$router.push.mock.calls[0][0]).toContain('/');
        });

        it('should notify the user after updating', async () => {
            wrapper.find('form').trigger('submit');

            await flushPromises();

            let callback = updateBot.call.mock.calls[0][1];
            callback();
            expect(wrapper.vm.$notify).toBeCalled();

            // With error
            callback({});
            expect(wrapper.vm.$notify.mock.calls[1][0].type).toBe('Danger');
        });
    });
});
