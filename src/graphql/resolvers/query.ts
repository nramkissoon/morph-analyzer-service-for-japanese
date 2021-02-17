import { mecabParseSync } from './../../mecab/mecab';
import { Query, Arg, Resolver } from 'type-graphql';
import { MecabOutput } from '../schema';
import { logger } from './../../utils/logger';
import { performance } from 'perf_hooks';

@Resolver()
export class QueryResolver {
    @Query(() => MecabOutput, { nullable: false })
    tokenize(@Arg('text', () => String, { nullable: false }) text: string): MecabOutput {
        const t0 = performance.now();
        logger.log('info', `query: tokenize: text arg length: ${text.length}`);
        const mecabOutput = mecabParseSync(text);
        if (mecabOutput.error) {
            const error = mecabOutput.error;
            logger.log('error', `${error.name}: ${error.message}`);
        }
        logger.log('info', `query: tokenize: resolver execution time: ${performance.now() - t0}`);
        return mecabParseSync(text);
    }
}
