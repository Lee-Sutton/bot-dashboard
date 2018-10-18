import {Meteor} from 'meteor/meteor';
import {jestSmokeTest, meteorServer, meteorCall} from "./jest";

describe('jest smoke test', function () {
    it('should run', () => {
        expect(jestSmokeTest()).toBeTruthy();
    });
    it('should mock meteor dependencies', () => {
        expect(meteorServer()).toBeTruthy();
    });
    it('should mock meteor calls', function() {
        let args = 'dummyArg';
        meteorCall(args);
        expect(Meteor.call).toBeCalled();
        expect(Meteor.call.mock.calls[0]).toContain(args);
    });


});
