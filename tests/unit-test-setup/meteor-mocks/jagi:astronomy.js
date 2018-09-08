import {Mongo} from './mongo.js';

class AstronomyMock extends Mongo.Collection {
    constructor() {
        super();
        this.softRemove = jest.fn();
        this.save = jest.fn();
    }
}

export const Class = {
    create() {
        return new AstronomyMock();
    }
};