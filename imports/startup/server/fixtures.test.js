import {seedTestUsers, testUsers, resetTestDatabase} from "./fixtures";
import {Meteor} from 'meteor/meteor';
import {expect} from 'chai';

if (Meteor.isServer) {
    describe('fixtures test suite', function () {
        describe('#seedUsers', function () {
            beforeEach(function () {
                Meteor.users.remove({});
            });
            it('should seed users in to the database', function () {
                seedTestUsers();
                let users = Meteor.users.find({});
                expect(users.count()).to.eq(testUsers.length);
            });
            it('should not insert if the users are already present', function () {
                seedTestUsers();
                seedTestUsers();
                let users = Meteor.users.find({});
                expect(users.count()).to.eq(testUsers.length);
            });
        });
        describe('#reset test database', function () {
            beforeEach(function () {
                seedTestUsers();
            });

            it('should reset the database for the test user only', function () {
                resetTestDatabase();
                let testUserEmails = testUsers.map((testUser) => testUser.email);
                let users = Meteor.users.find({email: {$in: testUserEmails}});
                expect(users.count()).to.eq(0);
            });
        });
    });
}
