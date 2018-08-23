
import {shallowMount} from '@vue/test-utils';

import navbar from '/imports/ui/components/navbar/navbar';

describe('', () => {
    it('should render', () => {
        let wrapper = shallowMount(navbar);
        expect(wrapper.html()).toContain('Reddit Bots');
    });
});
