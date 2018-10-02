
import {mount} from '@vue/test-utils';
import {Meteor} from 'meteor/meteor';
import {User} from "../../../../../imports/api/users/users";

import UserAccount from '/imports/ui/components/navbar/UserAccount';

describe('#UserAccount component spec', () => {
    let wrapper,
        email = 'dummy@e.com';

    beforeEach(() => {
        jest.resetAllMocks();
        Meteor.user.mockReturnValue(false);

        User.findOne.mockReturnValue({
            primaryEmail: () => email
        });
    });

    it('should render', () => {
        wrapper = mount(UserAccount);
        expect(wrapper.html()).toContain('Login');
    });

    it('should display the logged in users email', () => {

        Meteor.user.mockReturnValue(true);


        wrapper = mount(UserAccount);
        expect(wrapper.find('#login-sign-in-link').html()).toContain(email);
    });

    it('should show the login modal when the Login link is clicked', () => {
        let email = 'dummy@e.com',
            password = 'password';
        wrapper = mount(UserAccount);
        wrapper.find('#login-sign-in-link').trigger('click');
        wrapper.find('#email').setValue(email)
        wrapper.find('#password').setValue(password);
        wrapper.find('form').trigger('submit');

        expect(Meteor.loginWithPassword.mock.calls[0][0]).toBe(email);
        expect(Meteor.loginWithPassword.mock.calls[0][1]).toBe(password);
    });

    it('should log the user out', () => {
        Meteor.user.mockReturnValue(true);
        wrapper = mount(UserAccount);
        wrapper.find('#logout').trigger('click');
        expect(Meteor.logout.mock.calls.length).toBe(1);
    });
});
