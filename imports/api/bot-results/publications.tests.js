
import { expect } from 'chai';
import { Bots } from '/imports/api/bots/bots.js';
import {BotResults} from '/imports/api/bot-results/bot-results.js';
import { PublicationCollector } from 'meteor/johanbrook:publication-collector';
import '/imports/api/bot-results/publications.js';

describe('botResults publication', function () {
    describe('botResults', function () {
        let botId;

        beforeEach(function () {
            BotResults.remove({});
            Bots.remove({});
            botId = Bots.insert({
                title: 'test bot',
                description: 'Test describe goes here',
                userId: 1,
            });

            BotResults.insert({
                botId,
                title: 'dummyTitle',
                score: 150,
                url: 'dummyUrl'
            });
        });

        it('returns results for the input botID', async function () {
            const collector = new PublicationCollector();
            collector.userId = 1;

            const collections = await collector.collect('botResults', botId);

            expect(collections.botResults).to.not.be.undefined;
            expect(collections.botResults).to.have.lengthOf(1);
        });

        it('Returns undefined if the user is not logged in', async function() {
            const collector = new PublicationCollector();
            collector.userId = undefined;

            const collections = await collector.collect('botResults', botId);

            expect(collections.botResults).to.be.undefined
        });


        it('Returns bots for the input botID only', async function() {
            BotResults.insert({
                botId: 'dummySecondId'
            });
            const collector = new PublicationCollector();
            collector.userId = 1;

            const collections = await collector.collect('botResults', botId);

            expect(collections.botResults).to.have.lengthOf(1);
        });
    });
});
