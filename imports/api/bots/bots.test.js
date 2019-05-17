import {assert, expect} from 'chai';
import {Bot, insertBot, setNotification, updateBot, deleteBot} from './bots.js';
import td from 'testdouble';
import {Meteor} from 'meteor/meteor';
import {BotResults} from "../bot-results/bot-results";

const botFixture = () => {
    return {
        name: 'test bot',
        subreddit: 'dummySubreddit',
        keyword: 'dummy keyword',
        userId: 'dummyId',
    }
};

if (Meteor.isClient) {
    describe.only('#Bot meteor methods', function () {
        let userId = '234567fjdsakl',
            meteorUser;

        beforeEach(function () {
            meteorUser = td.replace(Meteor, 'user');
            td.when(meteorUser()).thenReturn({_id: userId})
        });

        afterEach(function () {
            td.reset();
        });

        describe('#create', function () {
            it('should create a bot', function () {
                const bot = new Bot(botFixture());
                const _id = bot.create();
                console.log(_id);
                expect(_id).to.be.ok;
            });

            it('Throws if the user is not logged in', function() {
                td.when(meteorUser()).thenReturn(undefined);

                let invalidCall = () => {
                    let bot = new Bot(botFixture());
                    return bot.create();
                };

                expect(invalidCall).to.throw();
            });
        });
    });
}

if (Meteor.isServer) {
    describe('bots collection', function () {
        let botId,
            dummyBot = {
                name: 'test bot',
                subreddit: 'dummySubreddit',
                keyword: 'dummy keyword',
                userId: 'dummyId',
            };

        let dummyResults = {
            url: 'http://dummyurl.com',
            title: 'description would go here',
            score: 100,
            userId: 'dummyId',
        };

        beforeEach(function () {
            Bot.remove({});
            const bot = new Bot(dummyBot);

            botId = bot.save();
        });

        it('inserts correctly', function () {
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

        describe('#results helper', function () {
            it('it should return the related results', function () {
                BotResults.insert({
                    ...dummyResults,
                    botId,
                });

                const bot = Bot.findOne({_id: botId});
                let results = bot.results();
                expect(results).to.be.ok;

                let botResult = results.fetch()[0];
                expect(botResult.url).to.eq(dummyResults.url);
                expect(botResult.botId).to.eq(botId);
            });
        });

        describe('#insertBot meteor method', function () {
            let userId = '234567fjdsakl',
                meteorUser;

            beforeEach(function () {
                Bot.remove({});
                meteorUser = td.replace(Meteor, 'user');
                td.when(meteorUser()).thenReturn({_id: userId})
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


        describe('#updateBot meteor method', function () {
            let userId = '234567fjdsakl',
                meteorUser,
                botId;

            beforeEach(function () {
                Bot.remove({});
                meteorUser = td.replace(Meteor, 'user');
                td.when(meteorUser()).thenReturn({_id: userId});

                botId = Bot.insert(botFixture());
            });

            afterEach(function () {
                td.reset();
            });

            it('should update the bot', function() {
                let bot = botFixture();

                bot._id = botId;
                bot.name = 'new name';

                let output = updateBot.call(bot);

                expect(output).to.be.ok;

                let updatedBot = Bot.findOne({_id: botId});
                expect(updatedBot.name).to.eq(bot.name);
            });

            it('Throws if the user is not logged in', function() {
                td.when(meteorUser()).thenReturn(undefined);

                let invalidCall = () => {
                    let bot = new Bot(dummyBot);
                    updateBot.call(bot);
                };

                expect(invalidCall).to.throw;
            });
        });

        describe('#setNotification meteor method', function () {
            let userId = '234567fjdsakl',
                meteorUser;

            beforeEach(function () {
                Bot.remove({});
                const bot = new Bot(dummyBot);

                botId = bot.save();

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

        describe('#deleteBot meteor method', function () {
            let userId = '234567fjdsakl',
                meteorUser;

            beforeEach(function () {
                Bot.remove({});
                const bot = new Bot(dummyBot);

                botId = bot.save();

                meteorUser = td.replace(Meteor, 'user');
                td.when(meteorUser()).thenReturn({_id: userId})
            });

            it('softRemove the bot', function () {
                let bot = Bot.findOne({_id: botId});
                bot.delete();
                expect(Bot.findOne({_id: botId})).to.be.undefined;
            });
        });
    });
}
