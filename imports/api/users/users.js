import {Meteor} from 'meteor/meteor';
import {Class} from 'meteor/jagi:astronomy';

const UserProfile = Class.create({
    name: 'UserProfile',
    fields: {
        nickname: String
        /* Any other fields you want to be published to the client */
    }
});

export const User = Class.create({
    name: 'User',
    collection: Meteor.users,
    fields: {
        createdAt: Date,
        emails: {
            type: [Object],
            default() {
                return [];
            }
        },
    },
    helpers: {
        primaryEmail () {
            return this.emails[0].address;
        }
    }
});

