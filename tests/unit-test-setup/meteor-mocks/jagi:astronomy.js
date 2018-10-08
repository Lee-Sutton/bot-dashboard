import {Mongo} from 'meteor/mongo';

export let astonomyMocks = [];

export const resetAstronomyMocks = () => {
    astonomyMocks = [];
};

class AstronomyMock extends Mongo.Collection {
    constructor() {
        super();
        astonomyMocks.push(this);
        this.softRemove = jest.fn();
        this.save = jest.fn();
    }
    static insert() {}
    static findOne () {}
    static update () {}
    static find () {}
}

AstronomyMock.prototype.constructor = jest.fn();

export const Class = {
    create() {
        return AstronomyMock;
    }
};