// Tests for the behavior of the links collection
//
// https://guide.meteor.com/testing.html

import {Meteor} from 'meteor/meteor';
import {assert} from 'chai';
import {BotResults} from './bot-results.js';

if (Meteor.isServer) {
    describe('bots collection', function() {
        const dummyResults = {
                url: 'http://dummyurl.com',
                title: 'description would go here',
                score: 100
            };

        it('insert correctly', function() {
            const _id = BotResults.insert(dummyResults);

            const added = BotResults.find({_id});
            const collectionName = added._getCollectionName();
            const count = added.count();

            assert.equal(collectionName, 'botResults');
            assert.equal(count, 1);
        });
    });
}
