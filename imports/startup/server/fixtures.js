import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';
import {BotResults} from '../../api/bot-results/bot-results';
import {Bot} from '../../api/bots/bots';


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
    seedTestUsers,
    resetTestDatabase: (users = testUsers) => {

        if (process.env.NODE_ENV !== 'development')
            throw new Meteor.Error('Requires development mode');

        let testUsersEmail = users.map((user) => user.email);

        let testUsers = testUsersEmail.map((testUserEmail) => {
            return Meteor.users.findOne({'emails.address': testUserEmail})
        });

        testUsers.forEach((testUser) => {
            Bot.remove({userId: testUser._id});
            BotResults.remove({userId: testUser._id});
        });

        Meteor.users.remove({email: {$in: testUsersEmail}});
    }
});