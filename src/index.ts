import { ApolloGateway } from "@apollo/gateway";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { readFileSync } from "fs";
import { buildSchema } from "graphql";
import * as routes from './routes/router';



async function startApolloServer() {

    let supergraphSdl = readFileSync('./src/schemas/supergraph.graphql').toString();

    const gateway = new ApolloGateway({
        supergraphSdl
    });

    const app = express();
    const port = 8080;

    const server = new ApolloServer({
        gateway: gateway,
        context: ({ req }) => {
            // If the 'schema' HTTP header is populated with any value, display the second supergraph
            // else, display the first supergraph
            const changeSchema = req.headers.schema;
            if (changeSchema) {
                gateway.schema = buildSchema(readFileSync('./src/schemas/supergraph2.graphql').toString());
            } else {
                gateway.schema = buildSchema(readFileSync('./src/schemas/supergraph.graphql').toString());
            }
            // Add the token to the context
            return {
                changeSchema,
                headers: {
                    ...req.headers,
                },
            };
        },
    })

    await server.start();

    app.listen({ port }, () => {
        console.log(`🚀 Server ready at http://localhost:${port}/graphql`)
    }
    );
    routes.register(app, server);

    return { server, app };
}

startApolloServer();