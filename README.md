# serverless-offline-multi

> A wrapper for `serverless-offline` that allows multiple instances to be ran concurrently with watch functionality. This is achieved using `concurrently` and `nodemon`.

## Prerequisites

You'll need `serverless` installed globally, and `serverless-offline` installed into your project before running this wrapper.  

## Install

```bash
npm install -g serverless-offline-multi
```

## Usage

There are two parameters that are passed to the wrapper, `directory` and `port`which specify the relative directory and port number that you wish for the `serverless-offline` process to listen on, respectively.

```bash
serverless-offline-multi --directory service-mailing --port 3001
```
These parameters can be repeated (in pairs) for multiple services, as follows:

```bash
serverless-offline-multi --directory service-mailing --port 3001 --directory service-account --port 3002
```

## Contributing
Contributions are very welcome, and I will gladly merge in features/bug fixes.

## License

MIT