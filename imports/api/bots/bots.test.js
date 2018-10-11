import {assert, expect} from 'chai';
import {Bot, insertBot, setNotification} from './bots.js';
import td from 'testdouble';
import {Meteor} from 'meteor/meteor';

describe('bots collection', function () {
    let botId,
        dummyBot = {
            name: 'test bot',
            subreddit: 'dummySubreddit',
            keyword: 'dummy keyword',
            userId: 'dummyId',
        };

    beforeEach(function () {
        const bot = new Bot(dummyBot);

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

    describe('#insertBot meteor method', function () {
        let userId = '234567fjdsakl',
            meteorUser;

        beforeEach(function () {
            meteorUser = td.replace(Meteor, 'userId');
            td.when(meteorUser()).thenReturn(userId)
        });

        afterEach(function () {
            td.reset();
        });

        it('should insert the bot', function() {
            let bot = new Bot(dummyBot);

            let botId = insertBot.call(bot);

            expect(botId).to.be.ok;

            let addedBot = Bot.findOne({_id: botId});
            expect(addedBot.userId).to.eq(userId);
        });

        it('Throws if the user is not logged in', function() {
            td.when(meteorUser()).thenReturn(undefined);

            let invalidCall = () => {
                let bot = new Bot(dummyBot);
                insertBot.call(bot);
            };

            expect(invalidCall).to.throw;
        });
    });

    describe('#setNotification meteor method', function () {
        let userId = '234567fjdsakl',
            meteorUser;

        beforeEach(function () {
            meteorUser = td.replace(Meteor, 'user');
            td.when(meteorUser()).thenReturn({_id: userId})
        });

        it('should update the notification', function () {
            let bot = Bot.findOne({_id: botId});
            setNotification.call({bot, notification: true});

            let updatedBot = Bot.findOne({_id: botId});
            expect(updatedBot.notification).to.eq(true);
        });
    });

});
