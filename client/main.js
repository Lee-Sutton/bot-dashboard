// Libs
import { Meteor } from 'meteor/meteor';
import Vue from 'vue';
import {store} from '/imports/startup/client/store.js';
import { Accounts } from 'meteor/accounts-base'
import {router} from '/imports/startup/client/routes';
import AppLayout from '../imports/ui/AppLayout.vue';
import '/imports/startup/client/vue-plugins';

import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import VeeValidate from 'vee-validate';
import VueSelect from 'vue-select';

Vue.use(VeeValidate);
Vue.use(BootstrapVue);
Vue.component('v-select', VueSelect);

Accounts.ui.config({
    passwordSignupFields: 'USERNAME_AND_EMAIL',
});

Meteor.startup(() => {
    new Vue({
        store,
        router,
        render: h => h(AppLayout),
    }).$mount('app');
});
