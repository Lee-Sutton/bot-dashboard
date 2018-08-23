// Libs
import { Meteor } from 'meteor/meteor';
import Vue from 'vue';
import {store} from '/imports/startup/client/store.js';
import { Accounts } from 'meteor/accounts-base'

Accounts.ui.config({
    passwordSignupFields: 'USERNAME_AND_EMAIL',
});

import VModal from 'vue-js-modal';
Vue.use(VModal, { dialog: true });

import Vuex from 'vuex'
Vue.use(Vuex);

import VueTracker from 'vue-meteor-tracker';
Vue.use(VueTracker);

import VueMeta from 'vue-meta';
Vue.use(VueMeta);

// Main app
import {routes} from '/imports/startup/client/routes'

Meteor.startup(() => {
    new Vue({
        store,
        data: {
            currentRoute: window.location.pathname
        },
        render(h) {
          return h(this.ViewComponent);
        },
        computed: {
            ViewComponent() {
                return routes[this.currentRoute];
            }
        }
    }).$mount('app');
});
