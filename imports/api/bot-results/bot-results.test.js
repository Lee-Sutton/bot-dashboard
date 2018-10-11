// Tests for the behavior of the links collection
//
// https://guide.meteor.com/testing.html

import {Meteor} from 'meteor/meteor';
import {assert, expect} from 'chai';
import {BotResult} from './bot-results.js';

if (Meteor.isServer) {
    describe('bots results collection', function() {
        const dummyResults = {
                url: 'http://dummyurl.com',
                title: 'description would go here',
                score: 100,
                userId: 'dummyId',
            };

        it('insert correctly', function() {
            const _id = BotResult.insert(dummyResults);

            const added = BotResult.find({_id});
            const collectionName = added._getCollectionName();
            const count = added.count();

            assert.equal(collectionName, 'botResults');
            assert.equal(count, 1);
        });
        it('should validate input args', function () {
            const fnThrows = () => {
                BotResult.insert({});
            };
            expect(fnThrows).to.throw();
        });
    });
}
