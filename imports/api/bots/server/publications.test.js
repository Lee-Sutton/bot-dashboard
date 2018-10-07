import { expect } from 'chai';
import { Bots } from '/imports/api/bots/bots.js';
import { PublicationCollector } from 'meteor/johanbrook:publication-collector';
import '/imports/api/bots/server/publications.js';

if (Meteor.isServer) {
    describe('bots publications', function () {
        beforeEach(function () {
            Bots.remove({});
            Bots.insert({
                title: 'test bot',
                description: 'Test describe goes here',
                userId: 1,
            });
        });

        describe('bots.all', function () {
            it('sends all bots for the logged in user', function (done) {
                const collector = new PublicationCollector();
                collector.userId = 1;
                collector.collect('bots.all', (collections) => {
                    try {
                        expect(collections.bots).to.not.be.undefined;
                        expect(collections.bots).to.have.lengthOf(1);
                        done();
                    } catch (e) {
                        done(e);
                    }
                });
            });

            it('Returns undefined if the user is not logged in', function(done) {
                const collector = new PublicationCollector();
                collector.collect('bots.all', (collections) => {
                    try {
                        expect(collections.bots).to.be.undefined;
                        done();
                    } catch (e) {
                        done(e);
                    }
                });
            });

            it('Returns bots for the logged in user only', function(done) {
                Bots.insert({
                    title: 'second bot',
                    description: 'description',
                    userId: 2
                });
                const collector = new PublicationCollector();
                collector.userId = 1;
                collector.collect('bots.all', (collections) => {
                    try {
                        expect(collections.bots).to.have.lengthOf(1);
                        expect(collections.bots[0]).to.have.property('title', 'test bot');
                        done();
                    } catch (e) {
                        done(e);
                    }
                });

            });


        });
    });
}
