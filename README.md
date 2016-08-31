# Steeplejack HTTP

[![Node.js Version][node-version-image]][node-version-url]
[![Build Status][travis-image]][travis-url]
[![Dependencies][dependencies-image]][dependencies-url]
[![Dev Dependencies][dev-dependencies-image]][dev-dependencies-url]
[![License][license-image]][license-url]

Allows Steeplejack projects to make HTTP calls to other servers

## Usage

This is a very thin wrapper for the [Request Promise Native](https://github.com/request/request-promise-native)
library. It exposes the HTTP methods as individual methods to allow easy reuse.

## Dependencies

This requires an object called `StoreError` to be registered to the Dependency Injector. You can either create your own
or use the [Steeplejack Errors](https://www.npmjs.com/package/steeplejack-errors) package


[node-version-image]: https://img.shields.io/badge/node.js-%3E%3D_0.12-brightgreen.svg?style=flat
[travis-image]: https://img.shields.io/travis/riggerthegeek/steeplejack-http.svg?style=flat
[dependencies-image]: http://img.shields.io/david/riggerthegeek/steeplejack-http.svg?style=flat
[dev-dependencies-image]: http://img.shields.io/david/dev/riggerthegeek/steeplejack-http.svg?style=flat
[license-image]: http://img.shields.io/:license-MIT-green.svg?style=flat

[node-version-url]: http://nodejs.org/download/
[travis-url]: https://travis-ci.org/riggerthegeek/steeplejack-http
[dependencies-url]: https://david-dm.org/riggerthegeek/steeplejack-http
[dev-dependencies-url]: https://david-dm.org/riggerthegeek/steeplejack-http#info=devDependencies&view=table
[license-url]: https://raw.githubusercontent.com/riggerthegeek/steeplejack-http/master/LICENSE
