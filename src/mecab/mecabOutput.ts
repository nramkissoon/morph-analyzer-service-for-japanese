import { MECAB_EMPTY_STRING } from './mecabConsts';

export interface MecabOutputWord {
    kanji: string | null;
    lexical: string | null;
    compound1: string | null;
    compound2: string | null;
    compound3: string | null;
    conjugation: string | null;
    inflection: string | null;
    original: string | null;
    reading: string | null;
    pronunciation: string | null;
}

const getFieldFromMecabStringArr = (wordData: string[], index: number): string | null => {
    if (index < wordData.length && index >= 0) {
        if (wordData[index] !== MECAB_EMPTY_STRING) {
            return wordData[index];
        }
    }
    return null;
};

/**
 * @description converts a string[] returned by MeCab to a MecabOutputWord for easier processing, changes '*' values to null
 * see https://github.com/hecomi/node-mecab-async for what indices match to which fields
 * @param {string[]} wordData
 * @returns {MecabOutputWord}
 */
export const convertToMecabOutputWord = (wordData: string[]): MecabOutputWord => {
    const mecabOutputWord: MecabOutputWord = {
        kanji: getFieldFromMecabStringArr(wordData, 0),
        lexical: getFieldFromMecabStringArr(wordData, 1),
        compound1: getFieldFromMecabStringArr(wordData, 2),
        compound2: getFieldFromMecabStringArr(wordData, 3),
        compound3: getFieldFromMecabStringArr(wordData, 4),
        conjugation: getFieldFromMecabStringArr(wordData, 5),
        inflection: getFieldFromMecabStringArr(wordData, 6),
        original: getFieldFromMecabStringArr(wordData, 7),
        reading: getFieldFromMecabStringArr(wordData, 8),
        pronunciation: getFieldFromMecabStringArr(wordData, 9),
    };
    return mecabOutputWord;
};

export interface MecabOutput {
    words: MecabOutputWord[];
    error?: MecabOutputError;
}

export interface MecabOutputError {
    name: string;
    message: string;
}
