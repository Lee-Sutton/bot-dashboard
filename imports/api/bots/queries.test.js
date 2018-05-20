import { getBots } from './queries.js';
import { Bots } from './bots.js';
import { expect } from 'chai';
import { Meteor } from 'meteor/meteor';

if (Meteor.isServer) {
    describe('bot queries test suite', function() {
        beforeEach(function() {
            Bots.remove({});
        });
        it('queries for bots', function() {
            let botId = Bots.insert({name: 'testName', description: 'Dummy description'}),
                bots = getBots.fetch({_id: botId});
            expect(bots).to.not.be.undefined;
            expect(bots).to.have.lengthOf(1);
            expect(bots[0]).to.have.property('name', 'testName');
        });

    });
}

