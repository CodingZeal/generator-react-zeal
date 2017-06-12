const path = require("path");

// Ideally, we'd point the import resolver to
// `node_modules/@zeal/react-scripts/config/webpack.config.dev.js` instead of
// having our own configuration here.  However, that doesn't currently work:
//
// - @zeal/react-scripts `lint` script loads `config/env.js`, which reads the
//   `.env` files and then transforms the NODE_PATH by removing any absolute
//   paths (to avoid accidentally importing files from outside the project)
//   and then resolving relative paths so that they become absolute.
//
// - `lint` spawns a call to `eslint` which ultimately loads
//   `webpack.config.dev.js`.  This new process inherits the massaged NODE_PATH
//   from above.
//
// - `webpack.config.dev.js` imports `config/env.js`.  Since this is now a
//   different process, that file is reloaded when re-does the NODE_PATH
//   transformation, removing the now-absolute path to our `client` directory.
//
// - As a result, `eslint` can't properly resolve any of our module imports.
//
// What is not clear: Why doesn't the second load of `config/env.js` also reload
// the `.env` file and get another copy of `./client`? We will need to
// investigate this further.

module.exports = {
  extends: ["zeal", "zeal/react", "prettier", "prettier/react"],
  root: true,
  settings: {
    "import/resolver": {
      webpack: {
        config: {
          resolve: {
            modules: [
              "node_modules",
              path.resolve(
                __dirname,
                "node_modules/@zeal/react-scripts/node_modules"
              ),
              path.resolve(__dirname, "client")
            ]
          }
        }
      }
    }
  }
};
