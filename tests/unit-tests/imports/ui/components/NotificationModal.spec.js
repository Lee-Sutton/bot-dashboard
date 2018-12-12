import {mount} from '@vue/test-utils';
import NotificationModal from '/imports/ui/components/notification-modal/NotificationModal';
import {Bot, setNotification} from '/imports/api/bots/bots';

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
        Bot.findOne.mockReturnValue({});

        wrapper.vm.saveNotification();

        expect(setNotification.call).toBeCalled();
    });
});
