// Tests for the behavior of the links collection
//
// https://guide.meteor.com/testing.html

import { Meteor } from 'meteor/meteor';
import { assert } from 'chai';
import { Bots } from './bots.js';

if (Meteor.isServer) {
    describe('bots collection', function () {
        it('insert correctly', function () {
            const botId = Bots.insert({
              name: 'test bot',
              description: 'description would go here',
            });

            const added = Bots.find({ _id: botId });
            const collectionName = added._getCollectionName();
            const count = added.count();

            assert.equal(collectionName, 'bots');
            assert.equal(count, 1);
        });
    });
}
