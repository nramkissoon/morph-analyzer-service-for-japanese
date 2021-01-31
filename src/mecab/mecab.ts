import MeCab from 'mecab-async';
import { MecabOutput, convertToMecabOutputWord, MecabOutputError } from './mecabOutput';
import { MECAB_ERRORS } from './mecabConsts';
import { logger } from './../utils/logger';

const mecabOptions = {
    maxBuffer: 300 * 1024 * 8, // 300kb
};

export const mecabInstance: {
    options: unknown;
    // see https://github.com/hecomi/node-mecab-async for return values
    parse: (text: string) => Promise<string[][]>;
    parseSync: (text: string) => string[][];
} = MeCab;
mecabInstance.options = mecabOptions;

export const mecabParseSync = (text: string): MecabOutput => {
    const mecabOutput: MecabOutput = {
        words: [],
    };
    try {
        if (text === null) {
            const mecabOutputError: MecabOutputError = {
                name: MECAB_ERRORS.NULL_INPUT.NAME,
                message: MECAB_ERRORS.NULL_INPUT.MESSAGE,
            };
            mecabOutput.error = mecabOutputError;
            return mecabOutput;
        } else if (text.length > mecabInstance.options['maxBuffer']) {
            const mecabOutputError: MecabOutputError = {
                name: MECAB_ERRORS.MAX_BUFFER_OVERFLOW.NAME,
                message: MECAB_ERRORS.MAX_BUFFER_OVERFLOW.MESSAGE(mecabInstance.options['maxBuffer']),
            };
            mecabOutput.error = mecabOutputError;
            return mecabOutput;
        }
        const parsingResult: string[][] = mecabInstance.parseSync(text);
        parsingResult.forEach((wordData: string[]) => {
            mecabOutput.words.push(convertToMecabOutputWord(wordData));
        });
        return mecabOutput;
    } catch (error) {
        logger.log('error', 'unknown mecab error');
        const mecabOutputError: MecabOutputError = {
            name: MECAB_ERRORS.UNKNOWN.NAME,
            message: MECAB_ERRORS.UNKNOWN.MESSAGE,
        };
        mecabOutput.error = mecabOutputError;
        return mecabOutput;
    }
};
