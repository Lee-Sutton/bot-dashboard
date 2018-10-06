import {Meteor} from 'meteor/meteor';
import {assert, expect} from 'chai';
import {Bot} from './bots.js';

if (Meteor.isServer) {
    describe('bots collection', function () {
        let botId;

        beforeEach(function () {
            const bot = new Bot({
                name: 'test bot',
                subreddit: 'dummySubreddit',
                keyword: 'dummy keyword'
            });

            botId = bot.save();
        });

        it('insert correctly', function () {
            const added = Bot.find({_id: botId});
            const collectionName = added._getCollectionName();
            const count = added.count();

            assert.equal(collectionName, 'bots');
            assert.equal(count, 1);
        });

        it('should give default values', function () {
            const bot = Bot.findOne({_id: botId});
            expect(bot.notification).to.eq(false);
            expect(bot.description).to.eq('');
            expect(bot.minimumScore).to.eq(0);
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
