import {Meteor} from 'meteor/meteor';
import {expect} from 'chai';
import {Bots, Bot} from './bots.js';
import './methods.js';

if (Meteor.isServer) {
    describe('bots methods', function () {
        const dummyBot = {
                name: 'New Bot',
                subreddit: 'hiphopheads',
                minimumScore: 100,
                keyword: 'FRESH',
                description: 'Dummy bot description'
            };

        describe('#bots.insert', function() {
            const addBot = Meteor.server.method_handlers['bots.insert'],
                dummyUser = {userId: 'dummyUser'};

            beforeEach(function() {
                Bots.remove({});
            });

            it('can add a new bot', function() {
                let returnValue = addBot.apply(dummyUser, [
                    dummyBot
                ]);

                expect(Bots.find().fetch()).to.have.lengthOf(1);
                expect(returnValue).to.not.be.undefined;

                let bot = Bots.findOne({});
                for (key in dummyBot) {
                    expect(bot[key]).to.equal(dummyBot[key]);
                }

            });
            it('Checks the name argument has the correct type', function() {
                let bot = {...dummyBot};
                bot.name = 0;

                let invalidCall = () => {
                    addBot.apply(dummyUser, [bot]);
                };

                expect(invalidCall).to.throw('Expected string');
                expect(Bots.find().fetch()).to.have.lengthOf(0);
            });

            it('Checks the description argument has the correct type', function() {
                let bot = {...dummyBot};
                bot.description = 0;
                let invalidCall = () => {
                    addBot.apply(dummyUser, [bot]);
                };

                expect(invalidCall).to.throw();
                expect(Bots.find().fetch()).to.have.lengthOf(0);
            });

            it('Stores the user id with the bot', function() {
                addBot.apply(dummyUser, [dummyBot]);

                expect(Bots.find().fetch()).to.have.lengthOf(1);
                expect(Bots.find().fetch()[0]).to.have.property('userId');
            });

            it('Throws if the user is not logged in', function() {
                let invalidCall = () => {
                    addBot.apply({}, [dummyBot]);
                };
                expect(invalidCall).to.throw('User not logged in');
            });
        });

    });
}
