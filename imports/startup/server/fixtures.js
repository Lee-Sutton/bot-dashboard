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
    resetTestDatabase: () => {

        if (process.env.NODE_ENV !== 'development')
            throw new Meteor.Error('Requires development mode');

        let testUsersEmail = testUsers.map((user) => user.email);

        let users = testUsersEmail.map((testUserEmail) => {
            return Meteor.users.findOne({'emails.address': testUserEmail})
        });

        users.forEach((user) => {
            Bot.remove({userId: user._id});
            BotResults.remove({userId: user._id});
            Meteor.users.remove({_id: user._id})
        });
    }
});