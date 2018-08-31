
import Vue from 'vue';
import VueMeteorTracker from 'vue-meteor-tracker'
import {Meteor} from 'meteor/meteor';

window.Tracker = {};
window.Meteor = Meteor;
window.Tracker.autorun = function (callback) {
    callback();
};

Vue.use(VueMeteorTracker);
