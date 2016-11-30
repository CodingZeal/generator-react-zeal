const generators = require('yeoman-generator')
const humps = require('humps')

module.exports = generators.Base.extend({
  prompting: function() {
    return this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Your project name',
        default: kabob(this.appname)
      }
    ]).then(function(answers) {
      this.appName = kabob(answers.name)
    }.bind(this))
  },

  writing: function() {
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      { appName: this.appName }
    )
    this.fs.copy(
      this.templatePath('.sass-lint.yml'),
      this.destinationPath('.sass-lint.yml')
    )
    this.fs.copy(
      this.templatePath('client'),
      this.destinationPath('client')
    )
    this.fs.copy(
      this.templatePath('public'),
      this.destinationPath('public')
    )
    this._mergeGitIgnore()
  },

  _mergeGitIgnore: function() {
    const template = this.fs.read(this.templatePath('.gitignore'))
    const existing = this.fs.read(this.destinationPath('.gitignore'), {
      defaults: ''
    })

    this.fs.write(
      this.destinationPath('.gitignore'),
      existing + '\n\n' + template
    )
  }
})

function kabob(string) {
  return humps.decamelize(humps.camelize(string), { separator: '-' })
}
