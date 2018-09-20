
import {mount} from '@vue/test-utils';
import {Meteor} from 'meteor/meteor';

import navbar from '/imports/ui/components/navbar/navbar';

describe('', () => {
    it('should render', () => {
        let wrapper = mount(navbar);
        expect(wrapper.html()).toContain('Reddit Bots');
    });
    it('should not render the search bar if the user is not logged in', () => {
        Meteor.user.mockReturnValueOnce(undefined);
        let wrapper = mount(navbar);
        expect(wrapper.html()).not.toContain('Submit');
    });
    it('should render the search bar if the user is logged in', () => {
        Meteor.user.mockReturnValueOnce(true);
        let wrapper = mount(navbar);
        expect(wrapper.html()).toContain('Search');
    });
});
