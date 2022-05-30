import * as express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors, { CorsOptions } from 'cors';

export const register = (app: express.Application, server: ApolloServer) => {
    var corsOptions: CorsOptions = {
        exposedHeaders: 'age',
    };
    app.use(cors(corsOptions));

    server.applyMiddleware({
        app,
        cors: false
    });
};
