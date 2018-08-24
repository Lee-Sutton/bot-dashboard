
import Vue from 'vue';
import VueMeteorTracker from 'vue-meteor-tracker'

window.Tracker = {};
window.Tracker.autorun = function (callback) {
    callback();
};

Vue.use(VueMeteorTracker);
