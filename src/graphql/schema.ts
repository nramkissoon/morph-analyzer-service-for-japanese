import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class MecabOutputWord {
    @Field(() => String, { nullable: true })
    kanji: string;
    @Field(() => String, { nullable: true })
    lexical: string;
    @Field(() => String, { nullable: true })
    compound1: string;
    @Field(() => String, { nullable: true })
    compound2: string;
    @Field(() => String, { nullable: true })
    compound3: string;
    @Field(() => String, { nullable: true })
    conjugation: string;
    @Field(() => String, { nullable: true })
    inflection: string;
    @Field(() => String, { nullable: true })
    original: string;
    @Field(() => String, { nullable: true })
    reading: string;
    @Field(() => String, { nullable: true })
    pronunciation: string;
}

@ObjectType()
export class MecabOutputError {
    @Field(() => String)
    name: string;
    @Field(() => String)
    message: string;
}

@ObjectType()
export class MecabOutput {
    @Field(() => [MecabOutputWord])
    words: MecabOutputWord[];
    @Field(() => MecabOutputError, { nullable: true })
    error?: MecabOutputError;
}
