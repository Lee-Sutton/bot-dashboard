import { Bots } from '/imports/api/bots/bots.js';
import { Meteor } from 'meteor/meteor';
import { linkQuery } from "../../../api/links/links";
import '/imports/ui/components/bot-list/bot-list.html';

Template.botList.onCreated(function () {
    Meteor.subscribe('links.all');
    this.linkQuery = linkQuery.clone();
    this.linkQuery.subscribe();
});

Template.botList.helpers({
    bots() {
      return Bots.find({});
    },
});

