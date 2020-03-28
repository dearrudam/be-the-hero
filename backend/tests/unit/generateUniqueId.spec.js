const generateUniqueId = require('./../../src/utils/generateUniqueId');

describe('Generate Unique IDs Function', () => {

    it('should create an unique ID', () => {
        const id = generateUniqueId();

        expect(id).toHaveLength(8);
    });

});