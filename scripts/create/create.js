const fs = require("fs");
const ncp = require("ncp");
const path = require("path");
const inquirer = require("inquirer");
const { createTsConfig } = require("../common/createTsConfig");
const { projectName, projectPath } = require("./values");
const { postCreate } = require("./post-create");

const templates = fs
  .readdirSync("src/templates")
  .filter((file) =>
    fs.lstatSync(path.join("src/templates", file)).isDirectory()
  );

inquirer
  .prompt([{ type: "list", name: "template", choices: templates }])
  .then((answers) => {
    const { template } = answers;

    if (!fs.existsSync("src/projects")) {
      fs.mkdirSync("src/projects");
    }

    ncp(path.join("src/templates", template), projectPath, (err) => {
      if (err) throw new Error(err);
      createTsConfig(projectPath);
      postCreate(projectName);
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log("Prompt couldn't be rendered in the current environment".red);
    } else {
      console.log(error);
    }
    process.exit(0);
  });
