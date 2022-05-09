# serverless-offline-multi

> A wrapper for `serverless-offline` that allows multiple instances to be ran concurrently with watch functionality. This is achieved using `concurrently` and `nodemon`.

## Prerequisites

You'll need `serverless` installed globally, and `serverless-offline` installed into your project before running this wrapper.

## Install

```bash
npm install -g serverless-offline-multi
```

## Usage

There are four parameters that are passed to the wrapper. For each service, three parameters, `directory`,`port` and `watch` which specify the relative directory, the port number that you wish for the `serverless-offline` process to listen on, and a `true` or `false` value specifying whether you want nodemon to watch for changes and restart the service upon detecting a change, respectively.

The fourth and only optional parameter is `stage`, which should only be specified once. If not specified, its default value is `dev`.

```bash
serverless-offline-multi --directory service-mailing --port 3001 --watch true --stage dev
```

These parameters can be repeated (in triples) for multiple services, as follows:

```bash
serverless-offline-multi --directory service-mailing --port 3001 --watch true --directory service-account --port 3002 --watch false --stage test
```

## HTTP Port & Lambda Port

- By default, `httpPort` is always the same as `http`.
- `lambdaPort` is always `httpPort/http` + 1000. Example, running with `--port 3004` will result in: `http: 3004`, `httpPort: 3004` and `lambdaPort: 4004` (port + 1000 to avoid conflict)

## Contributing

Contributions are very welcome, and I will gladly merge in features/bug fixes.

## License

MIT
