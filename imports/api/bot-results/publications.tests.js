import {expect} from 'chai';
import {Bot} from '/imports/api/bots/bots.js';
import {BotResult} from '/imports/api/bot-results/bot-results.js';
import {PublicationCollector} from 'meteor/johanbrook:publication-collector';
import '/imports/api/bot-results/publications.js';


if (Meteor.isServer) {
    describe('botResults publications', function () {
        let userId = 'dummyId',
            botId;

        beforeEach(function () {
            BotResult.remove({});
            Bot.remove({});
            botId = new Bot({
                name: 'dummyName',
                keyword: 'keyword',
                subreddit: 'subreddit',
                description: 'Test describe goes here',
                userId: userId,
            }).save();

            new BotResult({
                botId,
                title: 'dummyTitle',
                score: 150,
                url: 'dummyUrl',
                userId: userId
            }).save();
        });

        describe('botResults', function () {
            it('returns results for the input botID', async function () {
                const collector = new PublicationCollector();
                collector.userId = userId

                const collections = await collector.collect('botResults', botId);

                expect(collections.botResults).to.not.be.undefined;
                expect(collections.botResults).to.have.lengthOf(1);
            });

            it('Returns undefined if the user is not logged in', async function () {
                const collector = new PublicationCollector();
                collector.userId = undefined;

                const collections = await collector.collect('botResults', botId);

                expect(collections.botResults).to.be.undefined
            });


            it('Returns bots for the input botID only', async function () {
                BotResult.insert({
                    botId: 'dummySecondId',
                    title: 'dummyTitle',
                    score: 150,
                    url: 'dummyUrl',
                    userId: userId
                });
                const collector = new PublicationCollector();
                collector.userId = userId

                const collections = await collector.collect('botResults', botId);

                expect(collections.botResults).to.have.lengthOf(1);
            });
        });

        describe('#botResultsCounts publication', function () {
            it('should return the results for the current user', async function () {
                const collector = new PublicationCollector();
                collector.userId = userId

                const collections = await collector.collect('botResultCount');

                expect(collections.botResults).to.be.ok;
                expect(collections.botResults).to.have.lengthOf(1);
                expect(collections.botResults[0].botId).to.be.ok;
            });

            it('Returns undefined if the user is not logged in', async function () {
                const collector = new PublicationCollector();
                collector.userId = undefined;

                const collections = await collector.collect('botResultCount');

                expect(collections.botResults).to.be.undefined;
            });
        });
    });
}
