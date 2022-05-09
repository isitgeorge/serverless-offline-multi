#!/usr/bin/env node
const concurrently = require("concurrently");
const args = require("minimist")(process.argv.slice(2));
const { determineArguments, prefixColors } = require("./helpers");

exports.start = function () {
  try {
    const determinedArgs = determineArguments(args);
    const serviceCommands = determinedArgs.map((dirAndPortAndWatch) => {
      const { directory, port, watch } = dirAndPortAndWatch;
      return {
        command: buildCommand(directory, port, watch === "true"),
        name: directory,
        prefixColor:
          prefixColors[Math.floor(Math.random() * prefixColors.length)],
      };
    });

    concurrently(serviceCommands, {
      prefix: "name",
      killOthers: ["failure", "success"],
      restartTries: 3,
    }).then(
      () => {
        // success
      },
      () => {
        // failure
      }
    );
  } catch (e) {
    console.error(e.message);
  }
};

function buildCommand(directory, port, watch) {
  const installedPath = `${__dirname}/../node_modules`;
  const stage = args.stage || "dev";

  if (watch) {
    return `cd ${process.cwd()}/${directory} && ${installedPath}/nodemon/bin/nodemon.js --exec "serverless offline start --stage ${stage} --httpPort ${port} --lambdaPort ${
      Number(port) + 1000
    }" -e "js,yml"`;
  }
  return `cd ${process.cwd()}/${directory} && serverless offline start --stage ${stage} --httpPort ${port} --lambdaPort ${
    Number(port) + 1000
  }`;
}
