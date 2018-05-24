import { Bots } from '/imports/api/bots/bots.js';
import { Meteor } from 'meteor/meteor';
import { getBots } from '/imports/api/bots/queries.js';
import '/imports/ui/components/bot-list/bot-list.html';

Template.botList.onCreated(function () {
    Meteor.subscribe('bots.all');
    this.getBots = getBots.clone();
    this.getBots.subscribe();
});

Template.botList.helpers({
    bots() {
        // getBots.fetch();
        return Template.instance().getBots.fetch();
    },
});

