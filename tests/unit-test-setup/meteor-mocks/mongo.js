class Collection {
    constructor(name) {
        this.name = name;
        this.insert = jest.fn();
        this.attachSchema = jest.fn();
        this.update = jest.fn();
        this.remove = jest.fn();
        this.findOne = jest.fn();
        this.find = jest.fn();
    }
}


const Mongo = {Collection};

const RemoteCollectionDriver = jest.fn();
RemoteCollectionDriver.prototype.open = jest.fn().mockReturnThis();
RemoteCollectionDriver.prototype.insert = jest.fn();
RemoteCollectionDriver.prototype.update = jest.fn();
RemoteCollectionDriver.prototype.remove = jest.fn();
RemoteCollectionDriver.prototype.findOne = jest.fn();
RemoteCollectionDriver.prototype.find = jest.fn(() => ({
    count: jest.fn(),
    fetch: jest.fn(),
}));
const MongoInternals = {RemoteCollectionDriver};

module.exports = {
    Mongo,
    MongoInternals,
};
