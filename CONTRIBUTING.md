# Contributing to generator-react-zeal

Loving Zeal's React Boilerplate and want to get involved? Thanks! There are plenty of ways you can help.

Please take a moment to review this document in order to make the contribution process easy and effective for everyone involved.

Following these guidelines helps to communicate that you respect the time of the developers managing and developing this open source project. In return, they should reciprocate that respect in addressing your issue or assessing patches and features.

## Core Ideas

As much as possible, we try to avoid adding configuration and flags. The purpose of this tool is to provide the best experience for people getting started with React, and this will always be our first priority. This means that sometimes we [sacrifice additional functionality](https://gettingreal.37signals.com/ch05_Half_Not_Half_Assed.php) (such as server rendering) because it is too hard to solve it in a way that wouldn’t require any configuration.

We prefer **convention, heuristics, or interactivity** over configuration.<br>
Here’s a few examples of them in action.

### Convention

Instead of letting the user specify the entry filename, we always assume it to be `src/index.js`. Rather than letting the user specify the output bundle name, we generate it, but make sure to include the content hash in it. Whenever possible, we want to leverage convention to make good choices for the user, especially in cases where it’s easy to misconfigure something.

### Heuristics

Normally, `npm start` runs on port `3000`, and this is not explicitly configurable. However some environments like cloud IDEs want the programs to run on a specific port to serve their output. We want to play well with different environments, so Create React App reads `PORT` environment variable and prefers it when it is specified. The trick is that we know cloud IDEs already specify it automatically so there is no need for the user to do anything. Create React App relies on heuristics to do the right thing depending on environment.

Another example of this is how `npm test` normally launches the watcher, but if the `CI` environment variable is set, it will run tests once. We know that popular CI environments set this variable so the user doesn’t need to do anything. It just works.

### Interactivity

We prefer to add interactivity to the command line interface rather than add configuration flags. For example, `npm start` will attempt to run with port `3000` by default but it may be busy. Many other tools just fail in this case and ask that you pass a different port, but Create React App will display a prompt asking if you’d like to run the app on the next available port.

Another example of interactivity is `npm test` watcher interface. Instead of asking people to pass command line flags for switching between test runner modes or search patterns, we print a hint with keys that you can press during the test session to instruct watcher what to do. Jest supports both flags and interactive CLI but Create React App prefers long-running sessions to keep user immersed in the flow over short-running sessions with different flags.

### Breaking the Rules

No rules are perfect. Sometimes we may introduce flags or configuration if we believe the value is high enough to justify the mental cost. For example, we know that apps may be hosted paths different from the root, and we need to support this use case. However we still try to fall back to heuristics when possible. In this example, we ask that you specify `homepage` in `package.json`, and infer the correct path based on it. We also nudge the user to fill out the `homepage` after the build so the user becomes aware that the feature exists.

## Submitting a Pull Request

Good pull requests, such as patches, improvements, and new features, are a fantastic help. They should remain focused in scope and avoid containing unrelated commits.

Please **ask first** if somebody else is already working on this or the core developers think your feature is in-scope for Create React App. Generally always have a related issue with discussions for whatever you are including.

Please also provide a **test plan**, i.e. specify how you verified that your addition works.

------------

*Many thanks to [create-react-app](https://github.com/facebookincubator/create-react-app/blob/master/CONTRIBUTING.md) for the inspiration with this contributing guide*
