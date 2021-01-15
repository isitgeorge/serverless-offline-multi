const { getInstalledPath } = require("get-installed-path");
const _ = require("lodash");
const util = require("util");

const argTypes = [
  {
    name: "directory",
    validate: (arg) => typeof arg === "string",
  },
  {
    name: "port",
    validate: (arg) => typeof arg === "number",
  },
  {
    name: "watch",
    validate: (arg) => arg === "true" || arg === "false",
  },
];

// note that "directory", "port" and "watch" are never directly referenced below so it's easy to adjust the params later
const determineArguments = (args) => {
  if (!args) throw new Error("Arguments missing.");
  const missingArgs = _.chain(argTypes)
    .map((arg) => (args[arg.name] ? null : arg.name)) // e.g., if args["directory"] is null, return "directory", otherwise return null
    .compact() // remove all falsey (including null) values from the array, leaving a list of missing arguments ["directory"]
    .value();

  if (missingArgs.length > 0) {
    throw new Error(`Missing arguments: ${missingArgs}`);
  }

  if (
    argTypes.every((type) => Array.isArray(args[type.name])) && // are all the arguments are arrays?
    _.uniq(argTypes.map((type) => args[type.name].length)).length === 1 // ensure all input arrays have the same length
  ) {
    // all arguments are arrays of the same length
    const argumentArrays = argTypes.map((type) => args[type.name]);
    const services = _.zipWith(...argumentArrays, (...values) => {
      // [ [directory, directory], [port, port], [watch, watch] ]
      const service = _.zipObject(
        // [[directory, port, watch], [directory, port, watch]]
        argTypes.map((type) => type.name), // ["directory","port","watch"]
        values // [ /the/actual/directory, 3001, true ]
      ); // output is { dirctory: /the/actual/directory, port:3001, watch:true }

      if (!validateServiceArguments(service)) {
        throw new Error(
          `Invalid service configuration: ${util.inspect(service)}`
        );
      }
      return service;
    });

    return services;
  } else if (validateServiceArguments(args)) {
    // all values are primitives of the correct type
    return [pickArgsFromObject(args)];
  } else {
    throw new Error(
      `Arguments invalid. When starting services, each service must be sent all arguments: ${argTypes
        .map((arg) => `--${arg.name}`)
        .join(" ")}`
    );
  }
};

function validateServiceArguments(service) {
  return argTypes.every((argType) => argType.validate(service[argType.name]));
}

function pickArgsFromObject(obj) {
  return _.pick(
    obj,
    argTypes.map((type) => type.name)
  );
}
exports.determineArguments = determineArguments;

const prefixColors = [
  "red",
  "blue",
  "green",
  "yellow",
  "magenta",
  "cyan",
  "white",
  "gray",
];

exports.prefixColors = prefixColors;

