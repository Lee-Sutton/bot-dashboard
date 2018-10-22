
import Vue from 'vue';
import VueMeteorTracker from 'vue-meteor-tracker'
import {Meteor} from 'meteor/meteor';
import '/imports/startup/server/register-api';

import BootstrapVue from 'bootstrap-vue';
import VeeValidate from 'vee-validate';
import VueSelect from 'vue-select';

Vue.component('v-select', VueSelect);
Vue.use(BootstrapVue);
Vue.use(VeeValidate);

window.Tracker = {};
window.Meteor = Meteor;
window.Tracker.autorun = function (callback) {
    callback();
};

Vue.use(VueMeteorTracker);
