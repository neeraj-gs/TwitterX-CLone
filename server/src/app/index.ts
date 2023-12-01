import express from 'express'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4';
import bodyParser from 'body-parser';
import cors from 'cors'

import { User } from './user';

export async function initServer(){
    const app = express();
    app.use(bodyParser.json())
    app.use(cors())
    
    const gqlServer = new ApolloServer({
        typeDefs: `
        ${User.types}
        type Query{
            ${User.queries}
        }
        `,
        resolvers:{
            Query:{
                ...User.resolvers.queries
            },
        },
    })

    await gqlServer.start();

    app.use('/graphql',expressMiddleware(gqlServer))

    return app;
}

