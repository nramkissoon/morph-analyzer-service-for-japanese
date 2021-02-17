import { mecabParseSync } from './../../mecab/mecab';
import { Query, Arg, Resolver } from 'type-graphql';
import { MecabOutput } from '../schema';
import { logger } from './../../utils/logger';

@Resolver()
export class QueryResolver {
    @Query(() => MecabOutput, { nullable: false })
    tokenize(@Arg('text', () => String, { nullable: false }) text: string): MecabOutput {
        logger.log('info', `new tokenize query received.`);
        const mecabOutput = mecabParseSync(text);
        if (mecabOutput.error) {
            const error = mecabOutput.error;
            logger.log('error', `${error.name}: ${error.message}`);
        }
        return mecabParseSync(text);
    }
}
