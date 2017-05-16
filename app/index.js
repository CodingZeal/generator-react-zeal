const Generator = require("yeoman-generator");
const commandExists = require("command-exists");
const humps = require("humps");

module.exports = class ReactZeal extends Generator {
  prompting() {
    return this.prompt([
      {
        type: "input",
        name: "name",
        message: "Your project name",
        default: kabob(this.appname)
      }
    ]).then(
      function(answers) {
        this.appName = kabob(answers.name);
      }.bind(this)
    );
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath("package.json"),
      this.destinationPath("package.json"),
      { appName: this.appName }
    );

    this.fs.copy(this.templatePath("client"), this.destinationPath("client"), {
      globOptions: { dot: true }
    });

    this.fs.copy(
      this.templatePath(".eslintrc.js"),
      this.destinationPath(".eslintrc.js")
    );

    this.fs.copy(
      this.templatePath(".sass-lint.yml"),
      this.destinationPath(".sass-lint.yml")
    );

    this.fs.copy(
      this.templatePath("yarn.lock"),
      this.destinationPath("yarn.lock")
    );

    this._mergeGitIgnore();
  }

  install() {
    const isYarnAvailable = commandExists.sync("yarnpkg");
    this.installDependencies({
      yarn: isYarnAvailable,
      npm: !isYarnAvailable,
      bower: false
    });
  }

  _mergeGitIgnore() {
    const template = this.fs.read(this.templatePath("gitignore"));
    const existing = this.fs.read(this.destinationPath(".gitignore"), {
      defaults: ""
    });

    this.fs.write(
      this.destinationPath(".gitignore"),
      existing + "\n\n" + template
    );
  }
};

function kabob(string) {
  return humps.decamelize(humps.camelize(string), { separator: "-" });
}
