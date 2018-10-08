import {mount} from '@vue/test-utils';
import toBeType from "jest-tobetype";
import NotificationModal from '/imports/ui/components/notification-modal/NotificationModal';
import {Bot} from '/imports/api/bots/bots';

expect.extend({toBeType});

describe('NotificationModalSpec', () => {
    let wrapper;

    beforeEach(() => {
        jest.resetAllMocks();

        const $route = {
            params: {
                id: 'dummyId'
            }
        };

        wrapper = mount(NotificationModal, {
            mocks: {
                $route
            }
        });

        wrapper.vm.$notify = jest.fn();
    });

    it('should update the bot notification', function () {
        let bot = {
            setNotification: jest.fn()
        };
        Bot.findOne.mockReturnValue(bot);

        wrapper.vm.saveNotification();

        expect(bot.setNotification.mock.calls.length).toBe(1);
        expect(typeof bot.setNotification.mock.calls[0][0]).toBe('boolean');
    });
});