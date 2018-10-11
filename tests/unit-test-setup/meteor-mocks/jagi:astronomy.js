import {Mongo} from 'meteor/mongo';

export let astonomyMocks = [];

export const resetAstronomyMocks = () => {
    astonomyMocks = [];
};

class AstronomyMock extends Mongo.Collection {
    constructor(params) {
        super();

        for (let key in params) {
            this[key] = params[key];
        }

        astonomyMocks.push(this);
        this.softRemove = jest.fn();
        this.save = jest.fn();
    }
    static insert() {}
    static findOne () {}
    static update () {}
    static find () {}
}

AstronomyMock.insert = jest.fn();
AstronomyMock.findOne = jest.fn();
AstronomyMock.update = jest.fn();
AstronomyMock.find = jest.fn();


export const Class = {
    create() {
        return AstronomyMock;
    }
};