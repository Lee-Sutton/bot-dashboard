import {Meteor} from 'meteor/meteor';

export const jestSmokeTest = () => {
    return true;
};

export const meteorServer = () => {
    return Meteor.isServer;
};

export const meteorCall = (args) => {
    Meteor.call(args);
};

