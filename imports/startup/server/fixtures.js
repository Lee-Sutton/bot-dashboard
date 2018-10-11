import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';


export const testUsers = [
    {
        email: 'john@mailinator.com',
        password: 'password',
    },
    {
        email: 'lee@mailinator.com',
        password: 'password',
    },
];

export const resetTestDatabase = () => {
    let testUsersEmail = testUsers.map((user) => user.email);
    Meteor.users.remove({email: {$in: testUsersEmail}});
};

export const seedTestUsers = () => {
    testUsers.forEach((user) => {
        try {
            Accounts.createUser(user);
        } catch (err) {}
    });
};

Meteor.startup(() => {
    // if the users collection is empty
    if (Meteor.users.find().count() === 0) {
        seedTestUsers();
    }
});


Meteor.methods({
    seedTestUsers
});