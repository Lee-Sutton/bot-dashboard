import {getBots} from './queries.js';
import {Bots} from './bots.js';
import {expect} from 'chai';
import {Meteor} from 'meteor/meteor';

if (Meteor.isServer) {
    describe('bot queries test suite', function() {
        beforeEach(function() {
            Bots.remove({});
        });
        it('queries for bots', function() {
            const dummyBot = {
                name: 'testName',
                description: 'Dummy description',
                minimumScore: 100,
                subreddit: 'testing',
                keyword: 'keyword'
            };
            let botId = Bots.insert(dummyBot),
                bots = getBots.fetch({_id: botId});
            expect(bots).to.not.be.undefined;
            expect(bots).to.have.lengthOf(1);

            let bot = bots[0];

            for (key in dummyBot) {
                expect(bot[key]).to.equal(dummyBot[key]);
            }
        });
    });
}
