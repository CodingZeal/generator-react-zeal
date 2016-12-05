const path = require('path')
const assert = require('yeoman-assert')
const helpers = require('yeoman-test')

describe('react-zeal', () => {
  beforeEach(() => {
    return helpers.run(path.join(__dirname, '../../app'))
      .withPrompts({ name: 'apples' })
  })

  test('generated package.json has "apples" as the package name', () => {
    assert.fileContent('package.json', /"name": "apples"/)
  })
})
