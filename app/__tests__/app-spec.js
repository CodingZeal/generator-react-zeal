const path = require('path')
const assert = require('yeoman-assert')
const helpers = require('yeoman-test')

describe('react-zeal', () => {
  beforeEach(() => {
    return helpers.run(path.join(__dirname, '../../app'))
      .withPrompts({ name: 'apples' })
  })

  test('creates root level files', () => {
    assert.file(['.gitignore', 'package.json'])
  })

  test('generated package.json has "apples" as the package name', () => {
    assert.jsonFileContent('package.json', { "name": "apples" })
  })

  test('copies .eslintrc.json file', () => {
    assert.jsonFileContent('.eslintrc.json', {
      "extends": [ "zeal", "zeal/react" ]
    })
  })
})
