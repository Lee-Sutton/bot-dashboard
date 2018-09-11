import {Meteor} from 'meteor/meteor';
import {assert, expect} from 'chai';
import {Bot} from './bots.js';

if (Meteor.isServer) {
    describe('bots collection', function () {
        it('insert correctly', function () {
            const botId = Bot.insert({
                name: 'test bot',
                subreddit: 'dummySubreddit',
                keyword: 'dummy keyword'
            });

            const added = Bot.find({_id: botId});
            const collectionName = added._getCollectionName();
            const count = added.count();

            assert.equal(collectionName, 'bots');
            assert.equal(count, 1);
        });
        it('should validate input args', function () {
            const badInput = () => {
                let bot = new Bot({name: 1});
                bot.save();
            };
            expect(badInput).to.throw('[validation-error]');
        });
    });
}
