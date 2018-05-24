import { Meteor } from 'meteor/meteor';
import { expect } from 'chai';
import { Bots } from './bots.js';
import { Match } from 'meteor/check';
import './methods.js';

if (Meteor.isServer) {
    describe('bots methods', function () {
        beforeEach(function () {
            Bots.remove({});
        });

        it('can add a new bot', function () {
            const addBot = Meteor.server.method_handlers['bots.insert'];
            let returnValue = addBot.apply({}, ['New Bot', 'Dummy description']);

            expect(Bots.find().fetch()).to.have.lengthOf(1);
            expect(returnValue).to.not.be.undefined;
        });
        it('Checks the name argument has the correct type', function() {
            const addBot = Meteor.server.method_handlers['bots.insert'];
            let invalidCall = () => {
                addBot.apply({}, [19, 'Dummy description']);
            };

            expect(invalidCall).to.throw('Expected string');
            expect(Bots.find().fetch()).to.have.lengthOf(0);
        });

        it('Checks the description argument has the correct type', function() {
            const addBot = Meteor.server.method_handlers['bots.insert'];
            let invalidCall = () => {
                addBot.apply({}, ['Name here', 20]);
            };

            expect(invalidCall).to.throw();
            expect(Bots.find().fetch()).to.have.lengthOf(0);
        });

    });
}
