export const MECAB_EMPTY_STRING = '*';

export const MECAB_ERRORS = {
    NULL_INPUT: {
        NAME: 'Null Value',
        MESSAGE: 'Expected string but received null as input.',
    },
    UNKNOWN: {
        NAME: 'Unknown Error',
        MESSAGE: 'Unexpected error Occurred',
    },
    MAX_BUFFER_OVERFLOW: {
        NAME: 'Max Input String Overflow',
        MESSAGE: (maxLength: number): string => `Input string is longer than the allowed max length: ${maxLength}`,
    },
};
