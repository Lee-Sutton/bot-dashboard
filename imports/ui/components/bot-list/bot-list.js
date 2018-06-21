import { Bots } from '/imports/api/bots/bots.js';
import { Meteor } from 'meteor/meteor';
import { getBots } from '/imports/api/bots/queries.js';
import '/imports/ui/components/bot-list/bot-list.html';
import '/imports/ui/components/add-bot/add-bot.js';

Template.botList.onCreated(function () {
    Meteor.subscribe('bots.all');
    this.getBots = getBots.clone();
    this.getBots.subscribe();
});

Template.botList.helpers({
    bots() {
        return Template.instance().getBots.fetch();
    },
    botResults(bot) {
        let path = FlowRouter.path('botResults', {botId: this._id});
        return path;
    }
});

Template.botList.events({
    'click #add-bot': (event) => {
        event.preventDefault();
        Modal.show('addBot');
    }
});

