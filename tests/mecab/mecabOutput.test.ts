import { assert } from 'chai';
import 'mocha';
import { convertToMecabOutputWord } from './../../src/mecab/mecabOutput';

describe('mecabOutput Tests', () => {
    it('* values converted to null', () => {
        const input: string[] = ['*'];
        const output = convertToMecabOutputWord(input);
        assert(output.kanji === null);
    });
    it('nonexistent indices converted to null', () => {
        const input: string[] = [];
        const output = convertToMecabOutputWord(input);
        assert(output.kanji === null);
    });
});
