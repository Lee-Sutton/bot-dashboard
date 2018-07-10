
import {assert} from 'chai';
import td from 'testdouble';

describe('checking mocha works', function() {
    it('should work properly', function() {
        let publications = td.replace('../imports/api/bots-results/publications.js');
        publications.toMock = td.function();
        td.when(publications.toMock()).thenReturn(true);
        const fetchResults = require('../imports/api/bots-results/methods.js').fetchResults;
        assert(fetchResults(), 'is this running');
        td.verify(publications.toMock());
    });
});

