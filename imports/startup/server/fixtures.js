import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';

Meteor.startup(() => {
    // if the users collection is empty
    if (Meteor.users.find().count() === 0) {
        const data = [
            {
                email: 'john@mailinator.com',
                password: 'password',
            },
            {
                email: 'lee@mailinator.com',
                password: 'password',
            },
        ];
        data.forEach((user) => {
            Accounts.createUser(user);
        });
    }
});
