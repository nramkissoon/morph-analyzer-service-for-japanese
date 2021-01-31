import { assert, expect } from 'chai';
import 'mocha';
import sinon from 'sinon';
import { mecabParseSync, mecabInstance } from './../../src/mecab/mecab';
import { MECAB_ERRORS } from './../../src/mecab/mecabConsts';

describe('MeCab Tests', () => {
    describe('mecabParseSync', () => {
        it('empty string input returns correct value', () => {
            const output = mecabParseSync('');
            assert(!output.error);
            assert(output.words.length === 0);
        });
        it('null input returns correct value', () => {
            const output = mecabParseSync(null);
            assert(output.error);
            assert(output.words.length === 0);
            assert(MECAB_ERRORS.NULL_INPUT.NAME === output.error.name);
            assert(MECAB_ERRORS.NULL_INPUT.MESSAGE === output.error.message);
        });
        it('unknown error return correct value', () => {
            const stub = sinon.stub(mecabInstance, 'parseSync').throws('Error');
            const output = mecabParseSync('');
            expect(stub.calledOnce).to.be.true;
            assert(output.error);
            assert(MECAB_ERRORS.UNKNOWN.NAME === output.error.name);
            assert(MECAB_ERRORS.UNKNOWN.MESSAGE === output.error.message);
        });
        it('input longer than max buffer returns correct value', () => {
            mecabInstance.options['maxBuffer'] = 2;
            const output = mecabParseSync('longerthanmaxbuffer');
            assert(output.error);
            assert(MECAB_ERRORS.MAX_BUFFER_OVERFLOW.NAME === output.error.name);
            assert(
                MECAB_ERRORS.MAX_BUFFER_OVERFLOW.MESSAGE(mecabInstance.options['maxBuffer']) === output.error.message,
            );
        });
    });
});
