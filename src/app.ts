import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import 'reflect-metadata';
import { GRAPHQL_ENDPOINT_PATH } from './utils/consts';
import { QueryResolver } from './graphql/resolvers/query';
import { buildSchema } from 'type-graphql';
import cors from 'cors';

const main = async () => {
    const expressApp = express();
    expressApp.use(cors());
    const graphqlSchema = await buildSchema({
        resolvers: [QueryResolver],
        emitSchemaFile: false,
    });
    const server = new ApolloServer({
        schema: graphqlSchema,
        context: ({ req }) => {
            return { req };
        },
    });

    server.applyMiddleware({
        app: expressApp,
        path: GRAPHQL_ENDPOINT_PATH,
    });

    expressApp.listen({ port: 8080 }, () => console.log(`Server ready at http://localhost:8080${server.graphqlPath}`));
};

main();
