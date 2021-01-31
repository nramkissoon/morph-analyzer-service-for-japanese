import { mecabParseSync } from './../../mecab/mecab';
import { Query, Arg, Resolver } from 'type-graphql';
import { MecabOutput } from '../schema';

@Resolver()
export class QueryResolver {
    @Query(() => MecabOutput, { nullable: false })
    tokenize(@Arg('text', () => String, { nullable: false }) text: string): MecabOutput {
        return mecabParseSync(text);
    }
}
