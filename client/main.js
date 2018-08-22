// Libs
import { Meteor } from 'meteor/meteor';
import Vue from 'vue';
import { Accounts } from 'meteor/accounts-base'

Accounts.ui.config({
    passwordSignupFields: 'USERNAME_AND_EMAIL',
});

import VueTracker from 'vue-meteor-tracker';
Vue.use(VueTracker);

import VueMeta from 'vue-meta';
Vue.use(VueMeta);

import VModal from 'vue-js-modal'
// Vue.use(VModal);
Vue.use(VModal, {
    dynamic: true,
    injectModalsContainer: true
});

// Main app
import App from '/imports/ui/App.vue';

Meteor.startup(() => {
    new Vue({
        render: h => h(App),
    }).$mount('app');
});
