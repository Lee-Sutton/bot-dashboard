
import Vue from 'vue';
import VueMeteorTracker from 'vue-meteor-tracker'
import {Meteor} from 'meteor/meteor';
import '/imports/startup/server/register-api';

import BootstrapVue from 'bootstrap-vue';
Vue.use(BootstrapVue);

window.Tracker = {};
window.Meteor = Meteor;
window.Tracker.autorun = function (callback) {
    callback();
};

Vue.use(VueMeteorTracker);
