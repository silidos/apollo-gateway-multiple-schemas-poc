# apollo-gateway-multiple-schemas-poc
Apollo Gateway POC that displays two different schemas, toggling between the two if a "schema" HTTP header is passed.

Currently, resolvers are not implemented but you can test the logic through fetching the schema/an introspection request.

To start the repo -
npm install && npm run dev

The server will be started on port 8080.

If you wish to change the supergraphs, you may do so by editing the schemas and supergraph.yaml files and running the rover supergraph compose command locally.