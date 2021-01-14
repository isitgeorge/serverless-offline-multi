const { getInstalledPath } = require("get-installed-path");
const _ = require("lodash");

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
    // all arguments are arrays
    const argumentArrays = argTypes.map((type) => args[type.name]); // [ [directory, directory], [port, port], [watch, watch] ]
    return _.zipWith(...argumentArrays, (...values) => {
      return _.zipObject(
        argTypes.map((type) => type.name),
        values
      );
    });
  } else if (
    argTypes.every((argType) => argType.validate(args[argType.name]))
  ) {
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

