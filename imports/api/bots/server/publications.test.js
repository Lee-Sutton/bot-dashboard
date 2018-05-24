
// Tests for the bots publications
import { expect } from 'chai';
import { Bots } from '/imports/api/bots/bots.js';
import { PublicationCollector } from 'meteor/johanbrook:publication-collector';
import '/imports/api/bots/server/publications.js';

describe('links publications', function () {
      beforeEach(function () {
            Bots.remove({});
            Bots.insert({
                title: 'test bot',
                description: 'Test describe goes here',
            });
    });

    describe('bots.all', function () {
        it('sends all bots', function (done) {
            const collector = new PublicationCollector();
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
    });
});
