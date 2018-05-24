import { Meteor } from 'meteor/meteor';
import { expect } from 'chai';
import { Bots } from './bots.js';
import { Match } from 'meteor/check';
import './methods.js';

if (Meteor.isServer) {
    describe('bots methods', function () {
        const addBot = Meteor.server.method_handlers['bots.insert'],
            dummyUser = {userId: 1};

        beforeEach(function () {
            Bots.remove({});
        });

        it('can add a new bot', function () {
            let returnValue = addBot.apply(dummyUser, ['New Bot', 'Dummy description']);

            expect(Bots.find().fetch()).to.have.lengthOf(1);
            expect(returnValue).to.not.be.undefined;
        });
        it('Checks the name argument has the correct type', function() {
            let invalidCall = () => {
                addBot.apply(dummyUser, [19, 'Dummy description']);
            };

            expect(invalidCall).to.throw('Expected string');
            expect(Bots.find().fetch()).to.have.lengthOf(0);
        });

        it('Checks the description argument has the correct type', function() {
            let invalidCall = () => {
                addBot.apply(dummyUser, ['Name here', 20]);
            };

            expect(invalidCall).to.throw();
            expect(Bots.find().fetch()).to.have.lengthOf(0);
        });

        it('Stores the user id with the bot', function() {
            addBot.apply(dummyUser, ['Name here', 'description']);
            expect(Bots.find().fetch()).to.have.lengthOf(1);
            expect(Bots.find().fetch()[0]).to.have.property('userId');
        });

        it('Throws if the user is not logged in', function() {
            let invalidCall = () => {
                addBot.apply({}, ['test', 'test']);
            };
            expect(invalidCall).to.throw();
        });


    });
}
