import {Meteor} from 'meteor/meteor';
import {seedTestUsers} from '/imports/startup/both/fixtures';
import {expect} from 'chai';
import {User} from './users.js';

if (Meteor.isServer) {
    describe('users collection', function () {
        Meteor.users.remove({});
        seedTestUsers();
        it('should return the primary email address', function () {
            let user = User.findOne({});
            expect(user.primaryEmail()).to.be.ok;
            // TODO use regex here to validate the stored value is an email
        });
    });
}
