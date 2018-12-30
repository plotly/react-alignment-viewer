# React Alignment Viewer

MSA/Alignment viewer in React

> A React component to interactively view multiple genomic or proteomic sequences.

[![Build
Status](https://travis-ci.org/plotly/react-alignment-viewer.svg?branch=master)](https://travis-ci.org/plotly/react-alignment-viewer)

![](./assets/picture_1.png)

![](./assets/picture_2.png)


## Getting started


### Installation

For [yarn](https://yarnpkg.com/en/) users, run:

```
$ yarn add react-alignment-viewer
```

For [npm](https://www.npmjs.com/) users, run:

```
$ npm install react-alignment-viewer
```


### Usage

```js
import React from 'react';
import AlignmentViewer from 'react-alignment-viewer';
import dataset from 'p3.fasta';  // assumes you have raw-loader

class App extends React.Component {
  render() {
    return (
      <AlignmentViewer data={dataset}/>
    );
  }
}
```


## Development


### Testing locally

Get the code:

```
$ git clone https://github.com/plotly/react-alignment-viewer
```

Install the project `dev` dependencies:

```
# Install dependencies
$ yarn

# Watch source for changes and build to `src/lib/`
$ yarn start
```

The React app demo should be available at: http://localhost:8080/.


### Build and releases

To build the production version of this library, run the command below, which
will create a `dist/` folder containing the required files:

```
$ yarn build
```

In order to release a new version, you can push a git tag and Travis-CI will
automatically publish a npm release at:
https://www.npmjs.com/package/react-alignment-viewer. There is no need to run `yarn build` by yourself See the [`.travis.yml`](.travis.yml) for further information.


## Contributing

Thanks for your interest in maintaining the library!
Please see the [CONTRIBUTING](CONTRIBUTING.md) file.


## Contributor Code of Conduct

Please note that this project is released with a [Contributor Code of
Conduct](http://contributor-covenant.org/). By participating in this project you
agree to abide by its terms. See [CODE_OF_CONDUCT](CODE_OF_CONDUCT.md) file.


## License

react-alignment-viewer is released under the MIT License. See the bundled
[LICENSE](LICENSE) file for details.
