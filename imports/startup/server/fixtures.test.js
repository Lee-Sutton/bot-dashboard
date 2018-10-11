import {seedTestUsers, testUsers} from "./fixtures";
import {Meteor} from 'meteor/meteor';
import {expect} from 'chai';
import {Bot} from '/imports/api/bots/bots';

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
            const testUserEmails = testUsers.map((testUser) => testUser.email);
            const resetTestDatabase = Meteor.server.method_handlers['resetTestDatabase'];

            beforeEach(function () {
                Meteor.users.remove({});
                process.env.NODE_ENV = 'development';
                seedTestUsers();
            });

            afterEach(function () {
                Meteor.users.remove({});
                process.env.NODE_ENV = 'development';
            });

            it('should remove the test users from the database', function () {
                resetTestDatabase();
                let users = Meteor.users.find({});
                expect(users.count()).to.eq(0);
            });
            it('should remove all test user data from the database', function () {
                let testUser = Meteor.users.findOne({'emails.address': testUserEmails[0]});

                let bot = new Bot({
                    userId: testUser._id,
                    name: 'test bot',
                    subreddit: 'dummySubreddit',
                    keyword: 'dummy keyword',
                });

                let botId = bot.save();

                resetTestDatabase();

                expect(Bot.findOne({_id: botId})).to.be.undefined;
            });
            it('should leave the database untouched for non tests users', function () {
                const nonTestUser = {
                    email: 'test@e.com',
                    password: 'password',
                };

                let nonTestUserId = Accounts.createUser(nonTestUser);

                resetTestDatabase();

                let userData = Meteor.users.findOne({_id: nonTestUserId});
                expect(userData).to.be.ok;
            });
            it('should throw if the app is in production mode', function () {
                process.env.NODE_ENV = 'production';
                const invalidCall = () => {
                    resetTestDatabase();
                };

                expect(invalidCall).to.throw('Requires development mode');
            });
        });
    });
}
