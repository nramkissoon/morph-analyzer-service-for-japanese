import MeCab from 'mecab-async';
import { MecabOutput, convertToMecabOutputWord, MecabOutputError } from './mecabOutput';
import { MECAB_ERRORS } from './mecabConsts';

const mecabOptions = {
    maxBuffer: 300 * 1024 * 8, // 300kb
};

export const mecabInstance: {
    options: unknown;
    // see https://github.com/hecomi/node-mecab-async for return values
    parse: (text: string, callback: (error: Error, result: string[][]) => void) => Promise<string[][]>;
    parseSync: (text: string) => string[][];
} = MeCab;
mecabInstance.options = mecabOptions;

/**
 * Validates input text and calls mecab to parse it.
 * @param text string of text to be parsed
 */
export const mecabParse = async (text: string): Promise<MecabOutput> => {
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
        const parsingResult: string[][] = await new Promise<string[][]>((resolve, reject) => {
            mecabInstance.parse(text, (err: Error, result: string[][]) => {
                if (err) {
                    const mecabOutputError: MecabOutputError = {
                        name: MECAB_ERRORS.UNKNOWN.NAME,
                        message: MECAB_ERRORS.UNKNOWN.MESSAGE,
                    };
                    mecabOutput.error = mecabOutputError;
                }
                resolve(result);
            });
        });
        parsingResult.forEach((wordData: string[]) => {
            mecabOutput.words.push(convertToMecabOutputWord(wordData));
        });
        return mecabOutput;
    } catch (error) {
        const mecabOutputError: MecabOutputError = {
            name: MECAB_ERRORS.UNKNOWN.NAME,
            message: MECAB_ERRORS.UNKNOWN.MESSAGE,
        };
        mecabOutput.error = mecabOutputError;
        return mecabOutput;
    }
};

/**
 * @deprecated Use mecabParse for async functionality
 */
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
        const mecabOutputError: MecabOutputError = {
            name: MECAB_ERRORS.UNKNOWN.NAME,
            message: MECAB_ERRORS.UNKNOWN.MESSAGE,
        };
        mecabOutput.error = mecabOutputError;
        return mecabOutput;
    }
};
