const {Mongo} = require('./mongo');

const Meteor = {
    isServer: true,
    loginWithPassword: jest.fn(),
    loginWithFacebook: jest.fn(),
    logout: jest.fn(),
    methods: jest.fn(),
    call: jest.fn(),
    user: jest.fn(),
    users: new Mongo.Collection(),
    userId: jest.fn().mockReturnValue('f00bar'),
    startup: jest.fn(),
    bindEnvironment: jest.fn(),
    wrapAsync: jest.fn(),
    Error: jest.fn(Error),
    publications: {},
    mockSubscribe: jest.fn(),
    subscribe (name) {
        this.mockSubscribe(name);
        return this.publications[name]
    },
    publish (name) {
        this.publications[name] = {
            ready: jest.fn()
        }
    }
};

module.exports = {Meteor};
